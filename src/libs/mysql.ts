import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER } from '@/contants'
import mysql from 'serverless-mysql'

export const conn = mysql({
  config: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    // port: parseInt(DB_PORT ?? '3307'),
    database: DB_DATABASE,
    typeCast: function castField (field, putDefaultTypeCasting) {
      // We only want to cast bit fields that have a single-bit in them. If the field
      // has more than one bit, then we cannot assume it is supposed to be a Boolean.
      if ((field.type === 'BIT') && (field.length === 1)) {
        const bytes = field.buffer()

        // A Buffer in Node represents a collection of 8-bit unsigned integers.
        // Therefore, our single "bit field" comes back as the bits '0000 0001',
        // which is equivalent to the number 1.
        return (bytes && bytes[0] === 1)
      }

      return (putDefaultTypeCasting())
    }
  }
})
