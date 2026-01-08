type BadgeVariant = 'default' | 'ember' | 'oak' | 'sage' | 'ghost'
type BadgeSize = 'sm' | 'md'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  size?: BadgeSize
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-espresso/10 text-espresso',
  ember: 'bg-ember text-white',
  oak: 'bg-oak/20 text-oak',
  sage: 'bg-sage/20 text-sage',
  ghost: 'bg-transparent border border-espresso/20 text-espresso-light',
}

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
}

export function Badge({
  children,
  variant = 'default',
  size = 'sm',
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  )
}

// Pre-defined badges for common tags
export function TagBadge({ tag }: { tag: string }) {
  const tagConfig: Record<string, { label: string; variant: BadgeVariant }> = {
    vegan: { label: 'Vegan', variant: 'sage' },
    'gluten-free': { label: 'GF', variant: 'oak' },
    'dairy-free': { label: 'DF', variant: 'oak' },
    seasonal: { label: 'Seasonal', variant: 'ember' },
    'staff-pick': { label: 'Staff Pick', variant: 'ember' },
    new: { label: 'New', variant: 'ember' },
  }

  const config = tagConfig[tag] || { label: tag, variant: 'ghost' as BadgeVariant }

  return (
    <Badge variant={config.variant} size="sm">
      {config.label}
    </Badge>
  )
}
