import { ButtonHTMLAttributes } from 'react'

export default function CTAButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className="btn" {...props} />
}
