import type { ReactNode } from 'react'

type MobileShellProps = {
  children: ReactNode
}

export function MobileShell({ children }: MobileShellProps) {
  return (
    <div className="mx-auto min-h-dvh w-full max-w-[390px] px-4 pb-8 pt-[max(0.75rem,env(safe-area-inset-top))]">
      {children}
    </div>
  )
}
