const Pool = require('pg').Pool

const pool = new Pool({
    user: 'db',
    host: 'localhost',
    database: 'test',
    password: '****',
    port: '5432',   
})

//Getting users

const getUsers = (request, response) => {
    pool.query('SELECT * FROM user', (error, results) => {
       if(error) {
         throw error
       }
       response.status(200).json(results.rows)  
    })
}


//Creating users

const createUser = (request, response) => {
    const { is_superuser, username, first_name, last_name, email, is_staff, is_active, id } = request.body
    pool.query('INSERT INTO users () VALUES ($1, $2)', [], (error, results) => {
        if (error) {
          throw error
        }
        response.status(201).send(`User Added with ID: ${result.insertID}`)   
    })

}


const sevenDaysInactive = (request, response) => {
    pool.query('SELECT pu.username, pu.last_login, max(sl.started_at), pu.id FROM projects_user pu LEFT JOIN projects_synclog sl ON pu.id = sl.user_id GROUP BY pu.username, pu.last_login, pu.id HAVING MAX(sl.started_at) BETWEEN CURRENT_DATE - INTERVAL ' + "'" + '14' + "'" + ' DAY' + ' AND CURRENT_DATE - INTERVAL ' + "'" + '7' + "'" + ' DAY', (error, results) => {
       if(error) {
          throw error
       }
       response.status(200).json(results.rows)
    })
}

const fourteenDaysInactive = (request, response) => {
    pool.query('SELECT pu.username, pu.last_login, max(sl.started_at), pu.id FROM projects_user pu LEFT JOIN projects_synclog sl ON pu.id = sl.user_id GROUP BY pu.username, pu.last_login, pu.id HAVING MAX(sl.started_at) BETWEEN CURRENT_DATE - INTERVAL ' + "'" + '30' + "'" + ' DAY' + ' AND CURRENT_DATE - INTERVAL ' + "'" + '14' + "'" + ' DAY', (error, results) => {
       if(error) {
          throw error
       }
       response.status(200).json(results.rows)
    })
}

const thirtyDaysInactive = (request, response) => {
    pool.query('SELECT pu.username, pu.last_login, max(sl.started_at), pu.id FROM projects_user pu LEFT JOIN projects_synclog sl ON pu.id = sl.user_id GROUP BY pu.username, pu.last_login, pu.id HAVING MAX(sl.started_at) BETWEEN CURRENT_DATE - INTERVAL ' + "'" + '60' + "'" + ' DAY' + ' AND CURRENT_DATE - INTERVAL ' + "'" + '30' + "'" + ' DAY', (error, results) => {
       if(error) {
          throw error
       }
       response.status(200).json(results.rows)
    })
}

const sixtyDaysInactive = (request, response) => {
    pool.query('SELECT pu.username, pu.last_login, max(sl.started_at), pu.id FROM projects_user pu LEFT JOIN projects_synclog sl ON pu.id = sl.user_id GROUP BY pu.username, pu.last_login, pu.id HAVING MAX(sl.started_at) < CURRENT_DATE - INTERVAL ' + "'" + '60' + "'" + ' DAY', (error, results) => {
       if(error) {
          throw error
       }
       response.status(200).json(results.rows)
    })
}

module.exports = {
    getUsers,
    sixtyDaysInactive,
    thirtyDaysInactive,
    sevenDaysInactive,
    fourteenDaysInactive,
}
