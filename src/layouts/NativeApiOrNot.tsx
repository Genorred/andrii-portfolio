import React, {lazy, useEffect} from 'react';
import {isCssScrollAnimationsCompitable} from "@/lib/compitable.ts";
import {useStore} from "@nanostores/react";

const NativeVariant = lazy(() => import('../NativeVariant.tsx'))

const NativeApiOrNot = () => {
    const $isCartOpen = useStore(isCssScrollAnimationsCompitable);
    useEffect(() => {
    }, []);
    return (
        <></>
    );
};

export default NativeApiOrNot;