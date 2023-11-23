'use client'
import { BreadcrumbItem, Breadcrumbs, BreadcrumbsProps } from '@nextui-org/react'
import React from 'react'

export type MyBreadcrumbItemProps= {
  label: string,
  route?: string,
}

export type MyBreadcrumbsProps = BreadcrumbsProps & {
  items: MyBreadcrumbItemProps[]
}

export function MyBreadcrumbs (props: MyBreadcrumbsProps) {
  return (
    <Breadcrumbs {...props}>
      {
        props.items.map(item => (
          <BreadcrumbItem key={item.label} href={item.route}>{item.label}</BreadcrumbItem>
        ))
      }
    </Breadcrumbs>
  )
}
