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


// PUT update monument
export async function PUT({ params, request }) {

    const { id } = params;

    const { name, location, type, year_built, height_m, description } = await request.json();

    if (!name || !location) {
        return Response.json(
            { message: 'Missing required fields' },
            { status: 400 }
        );
    }

    const [result] = await pool.query(
        `UPDATE monuments 
        SET name = ?, location = ?, type = ?, year_built = ?, height_m = ?, description = ?
        WHERE id = ?`,
        [name, location, type, year_built, height_m, description, id]
    );

    if (result.affectedRows === 0) {
        return Response.json(
            { message: 'Monument not found' },
            { status: 404 }
        );
    }

    return Response.json(
        { message: 'Monument updated' },
        { status: 200 }
    );
}


// DELETE monument
export async function DELETE({ params }) {

    const { id } = params;

    const [result] = await pool.query(
        'DELETE FROM monuments WHERE id = ?',
        [id]
    );

    if (result.affectedRows === 0) {
        return Response.json(
            { message: 'Monument not found' },
            { status: 404 }
        );
    }

    return new Response(null, { status: 204 });
}