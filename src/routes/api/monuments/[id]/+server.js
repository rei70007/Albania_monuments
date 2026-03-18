// Import helper to create JSON responses in SvelteKit
import { json } from '@sveltejs/kit';
// Import the database connection pool
import pool from '$lib/server/db';
// Import authentication check
import { checkAuth } from '$lib/server/auth';
 

// GET monument by id
// This function handles GET requests for a specific monument by ID
export async function GET({ params }) {

    const { id } = params;
// Execute a SQL query to find the monument with the given ID
    const [rows] = await pool.query(
        'SELECT * FROM monuments WHERE id = ?',
        [id]
    );
// If no monument is found, return a 404 Not Found response
    if (rows.length === 0) {
        return Response.json(
            { message: 'Monument not found' },
            { status: 404 }
        );
    }
// Return success response
    return Response.json(rows[0], { status: 200 });
}


// PUT update monument
export async function PUT({ params, request }) {
 
    const { id } = params;
 
    const { name, location, type, year_built, height_m, description } = await request.json();
    
 // Ensure required fields are provided
    if (!name || !location) {
        return Response.json(
            { message: 'Missing required fields' },
            { status: 400 }
        );
    }
 // Update the monument with the given ID
// Prepared statement prevents SQL injection
    const [result] = await pool.query(
        `UPDATE monuments
        SET name = ?, location = ?, type = ?, year_built = ?, height_m = ?, description = ?
        WHERE id = ?`,
        [name, location, type, year_built, height_m, description, id]
    );
 // If no rows were affected, the monument does not exist
    if (result.affectedRows === 0) {
        return Response.json(
            { message: 'Monument not found' },
            { status: 404 }
        );
    }
 // Return success response
    return Response.json(
        { message: 'Monument updated' },
        { status: 200 }
    );
}

// DELETE monument
// This function handles DELETE requests to remove a monument
export async function DELETE({ params }) {
 
    const { id } = params;
 // Execute a SQL query to delete the monument
    const [result] = await pool.query(
        'DELETE FROM monuments WHERE id = ?',
        [id]
    );
 // If no rows were affected, the monument does not exist
    if (result.affectedRows === 0) {
        return Response.json(
            { message: 'Monument not found' },
            { status: 404 }
        );
    }
 
    return new Response(null, { status: 204 });

}