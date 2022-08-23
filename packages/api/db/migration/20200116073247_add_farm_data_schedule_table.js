/*
 *  Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
 *  This file (20200116073247_add_farm_data_schedule_table.js) is part of LiteFarm.
 *
 *  LiteFarm is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  LiteFarm is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  GNU General Public License for more details, see <https://www.gnu.org/licenses/>.
 */

export const up = function (knex) {
  return Promise.all([
    knex.schema.createTable('farmDataSchedule', (table) => {
      table.increments('request_number');
      table.uuid('farm_id').references('farm_id').inTable('farm').notNullable();
      table.boolean('is_processed').notNullable().defaultTo(false);
      table.timestamp('created_at').defaultTo(knex.fn.now());
    }),
  ]);
};

export const down = function (knex) {
  return Promise.all([knex.schema.dropTable('farmDataSchedule')]);
};
