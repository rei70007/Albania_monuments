import pool from '$lib/server/database.js';

// GET monument by id
export async function GET({ params }) {

    const { id } = params;

    const [rows] = await pool.query(
        'SELECT * FROM monuments WHERE id = ?',
        [id]
    );

    if (rows.length === 0) {
        return Response.json(
            { message: 'Monument not found' },
            { status: 404 }
        );
    }

    return Response.json(rows[0], { status: 200 });
}


