import { conn } from '@/libs/mysql'
import { EUserState } from '@/types/enumDB'
import { TUser, TUserCredentials } from '@/types/types'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req:NextRequest) => {
  try {
    const { username, password }: TUserCredentials = await req.json()
    // Validate user exist
    const [user] = await conn.query<TUser[]>('SELECT username, type, state, names, lastnames, email FROM users WHERE username = ? AND password = ?', [username, password])
    if (user?.state === EUserState.active) {
      return NextResponse.json({
        ok: true,
        message: 'Credentials pass',
        data: user
      })
    }
    return NextResponse.json({
      ok: false,
      message: 'Credentials NO pass'
    })
  } catch (error) {
    return NextResponse.json({
      ok: false,
      message: 'Erro en nservidor',
      error
    })
  }
}
