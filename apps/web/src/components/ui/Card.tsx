interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className = '', hover = false }: CardProps) {
  const hoverStyles = hover
    ? 'transition-shadow duration-300 hover:shadow-lg'
    : ''

  return (
    <div
      className={`bg-white rounded-xl shadow-sm overflow-hidden ${hoverStyles} ${className}`}
    >
      {children}
    </div>
  )
}

export function CardImage({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
    </div>
  )
}

export function CardContent({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`p-5 ${className}`}>{children}</div>
}

export function CardTitle({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <h3 className={`font-serif text-lg text-espresso ${className}`}>
      {children}
    </h3>
  )
}

export function CardDescription({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-sm text-espresso-light/80 ${className}`}>
      {children}
    </p>
  )
}
