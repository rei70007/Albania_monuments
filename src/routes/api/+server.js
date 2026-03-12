import pool from '$lib/server/database.js';


// GET all monuments (public)
export async function GET() {

    const [rows] = await pool.query('SELECT * FROM monuments');

    return Response.json(rows, { status: 200 });

}


// POST create monument (protected)
export async function POST({ request }) {

    if (!checkAuth(request)) {
        return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { name, location, type, height } = await request.json();

    if (!name || !location || !type) {
        return Response.json(
            { message: 'Missing required fields' },
            { status: 400 }
        );
    }

    const [result] = await pool.query(
        'INSERT INTO monuments (name, location, type, height) VALUES (?, ?, ?, ?)',
        [name, location, type, height]
    );

    return Response.json(
        {
            message: 'Monument created',
            id: result.insertId
        },
        { status: 201 }
    );
}