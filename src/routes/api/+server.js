import pool from '$lib/server/database.js';

// GET all monuments (public)
export async function GET() {

    const [rows] = await pool.query('SELECT * FROM monuments');

    return Response.json(rows, { status: 200 });

}

export async function POST({ request }) {

    const { name, location, type, year_built, height_m, description } = await request.json();

    // validate required fields
    if (!name || !location) {
        return Response.json(
            { message: 'Missing required fields' },
            { status: 400 }
        );
    }

    const [result] = await pool.query(
        `INSERT INTO monuments 
        (name, location, type, year_built, height_m, description)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [name, location, type, year_built, height_m, description]
    );

    return Response.json(
        {
            message: 'Monument created',
            id: result.insertId
        },
        { status: 201 }
    );
}