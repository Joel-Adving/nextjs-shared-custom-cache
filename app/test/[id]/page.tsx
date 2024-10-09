import React from 'react'

export const revalidate = 100

export async function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }]
}

export default function Page({ params: { id } }) {
  return <div>{id}</div>
}
