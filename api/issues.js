
import { db } from 'hatchable';

export const access = 'public';

export default async function(req,res) {
  try {
    if(req.method === 'GET') {
      const {rows} = await db.query(
        'SELECT * FROM campus_reports ORDER BY created_at DESC'
      );
      return res.json({issues:rows});
    }

    if(req.method === 'POST') {
      const b = req.body || {};

      if(b.action === 'create') {
        const {rows} = await db.query(
          `INSERT INTO campus_reports
          (reporter_id,reporter_role,reporter_name,category,location,description)
          VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
          [
            b.reporter_id,b.reporter_role,b.reporter_name,
            b.category,b.location,b.description
          ]
        );
        return res.status(201).json({issue:rows[0]});
      }

      if(b.action === 'assign') {
        const {rows} = await db.query(
          "UPDATE campus_reports SET technician_id=$1,status='Assigned',updated_at=NOW() WHERE id=$2 RETURNING *",
          [b.technician_id,b.id]
        );
        return res.json({issue:rows[0]});
      }

      if(b.action === 'update') {
        const {rows} = await db.query(
          'UPDATE campus_reports SET status=$1,technician_note=$2,grade=$3,updated_at=NOW() WHERE id=$4 RETURNING *',
          [b.status,b.technician_note||'',b.grade||null,b.id]
        );
        return res.json({issue:rows[0]});
      }

      return res.status(400).json({error:'Unknown action'});
    }

    return res.status(405).json({error:'Method not allowed'});
  } catch(e) {
    return res.status(500).json({error:e.message});
  }
}
