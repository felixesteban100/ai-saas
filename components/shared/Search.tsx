"use client";

import Image from "next/image";
import { /* useEffect, */ useState } from "react"; 1

import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { /* useSearchParams, */ useRouter } from "next/navigation";
// import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

export const Search = () => {
    // const router = useRouter();
    // const searchParams = useSearchParams();
    const [query, setQuery] = useState("");

    // useEffect(() => {
    //     const delayDebounceFn = setTimeout(() => {
    //         if (query) {
    //             const newUrl = formUrlQuery({
    //                 searchParams: searchParams.toString(),
    //                 key: "query",
    //                 value: query,
    //             });

    //             router.push(newUrl, { scroll: false });
    //         } else {
    //             const newUrl = removeKeysFromQuery({
    //                 searchParams: searchParams.toString(),
    //                 keysToRemove: ["query"],
    //             });

    //             router.push(newUrl, { scroll: false });
    //         }
    //     }, 300);

    //     return () => clearTimeout(delayDebounceFn);
    // }, [router, searchParams, query]);


    const { replace } = useRouter()

    function search() {
        replace(`?query=${query}`)
    }

    return (
        <div className="search">
            <Button
                onClick={() => search()}
                variant={"ghost"}
                size={"icon"}
                className="self-center rounded-full"
            >
                <Image
                    src="/assets/icons/search.svg"
                    alt="search"
                    width={24}
                    height={24}
                    className="svg-color"
                />
            </Button>

            <Input
                className="search-field"
                placeholder="Search"
                // onChange={(e) => setQuery(e.target.value)}
                onChange={(e) => setQuery(e.target.value)}
            />
        </div>
    );
};