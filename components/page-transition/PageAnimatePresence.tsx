'use client'

import { usePathname, useSearchParams, useParams } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import FrozenRoute from './FrozenRoute'

const PageAnimatePresence = ({ children }: { children: JSX.Element }) => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const params = useParams()

    /* const conffirm = (pathname === "/rankings" && searchParams.get('fixedAttribute') !== undefined) || (pathname === "/characters" && searchParams.get('pageCharacters') !== undefined)

    console.log(conffirm)

    if (conffirm === true) {
        return (
            <AnimatePresence mode="popLayout">
                <motion.div key={pathname}>
                   {children}
                </motion.div>
            </AnimatePresence>
        )
    } */

    return (
        <AnimatePresence mode="wait">
            {/**
       * We use `motion.div` as the first child of `<AnimatePresence />` Component so we can specify page animations at the page level.
       * The `motion.div` Component gets re-evaluated when the `key` prop updates, triggering the animation's lifecycles.
       * During this re-evaluation, the `<FrozenRoute />` Component also gets updated with the new route components.
       */}
            <motion.div key={pathname + searchParams}>
                <FrozenRoute>{children}</FrozenRoute>
            </motion.div>
        </AnimatePresence>
    )
}

export default PageAnimatePresence