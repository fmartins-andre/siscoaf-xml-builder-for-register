const getDatabaseConnection = require('./getDatabaseConnection')

const getDatabaseData = async (originEventNumber) => {
  try {
    const connection = await getDatabaseConnection()

    if (!connection)
      throw Error('Não foi possível se conectar ao banco de dados.')

    const [peopleRows] = await connection.execute(
      `SELECT
        sl5.L5_Nome AS 'personName'
        , IF(sl5.L5_Cpf IS NOT NULL AND sl5.L5_Cpf != '' AND sl5.L5_Cpf != '   .   .   -  '
            , sl5.L5_Cpf
            , IF (sl5.L5_Classificacao = 'Jurídica'
                , 'PJ'
                , 'PF'
            )
        ) AS 'personId'
        , CAST(FALSE AS JSON) AS 'personIsPoliticallyExposed'
        , CAST(FALSE AS JSON) AS 'personIsObliged'
        , "0" AS 'personIsGovernmentEmployee'
    FROM sqlreg3.l1parte slp
    INNER JOIN sqlreg3.l5 sl5 ON (slp.p1_parte = sl5.l5_parte AND slp.p1_seq = sl5.l5_seq)
    WHERE slp.p1_protocolo='${originEventNumber}'`
    )
    const [eventRows] = await connection.execute(
      `SELECT
        srr.rr_valoritbi AS 'eventValue'
        , DATE_FORMAT(srr.Rr_DataEscritura ,'%Y-%m-%d')  AS 'eventDate'
    FROM sqlreg3.l1 sl1
    LEFT JOIN sqlreg3.rr srr ON (sl1.L1_ProtRecep = srr.Rr_Protocolo)
    WHERE sl1.L1_Protocolo='${originEventNumber}'`
    )
    await connection.end()

    return { peopleRows, eventRows }
  } catch (error) {
    return { error }
  }
}

module.exports = getDatabaseData
