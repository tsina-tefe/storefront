'use server'

import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { signIn } from '@/lib/auth'

export async function registerUser({ name, email, password }) {
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return { error: 'An account with this email already exists.' }
  }

  const hashed = await bcrypt.hash(password, 12)

  await prisma.user.create({
    data: { name, email, password: hashed },
  })

  await signIn('credentials', {
    email,
    password,
    redirectTo: '/',
  })
}

export async function loginUser({ email, password }) {
  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/',
    })
  } catch (error) {
    return { error: 'Invalid email or password.' }
  }
}
