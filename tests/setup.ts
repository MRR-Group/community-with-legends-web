import {afterAll, expect} from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";
import {cleanup} from "@testing-library/react";

expect.extend(matchers)

afterAll(()=>{
    cleanup()
})