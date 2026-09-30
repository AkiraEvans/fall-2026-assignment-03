// TODO: Student implementation - Part 2: DAL for time logs
import { db, TimeLog, NewTimeLog } from '../db/database.js';

export async function insertTimeLog(
  ticketId: number,
  userId: number,
  hours: number,
): Promise<TimeLog> {
  // TODO: Student implementation
  const timeLog : NewTimeLog = {ticket_id:ticketId, user_id:userId, hours:hours};
  return await db.insertInto('time_logs').values(timeLog).returningAll().executeTakeFirstOrThrow();
}

export async function getTotalHoursForTicket(
  ticketId: number,
): Promise<number> {
  // TODO: Student implementation
  const result = await db.selectFrom('time_logs').select((expression)=>expression.fn.sum('hours').as('total_hours'))
  .where('ticket_id','=',ticketId).executeTakeFirst();
  return Number(result?.total_hours || 0);
}
