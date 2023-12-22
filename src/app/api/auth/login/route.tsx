import { conn } from '@/libs/mysql'
import { UserCredentials, UserFromDB, EUserState, ApiResponseWithReturn } from '@/types'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req:NextRequest) => {
  try {
    const { username, password }: UserCredentials = await req.json()
    // Validate user exist
    const [user] = await conn.query<UserFromDB[]>('SELECT userId, username, type, state, names, lastnames, email FROM users WHERE username = ? AND password = ?', [username, password])
    if (user.state === EUserState.active) {
      return NextResponse.json<ApiResponseWithReturn<UserFromDB>>({
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
