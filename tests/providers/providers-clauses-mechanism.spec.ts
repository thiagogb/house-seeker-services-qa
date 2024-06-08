import {expect, test} from "@playwright/test";

test.describe(`/api/graph: query { providers }`, () => {

    test(`expected where mechanism is null`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { mechanism: { isNull: true } }
                            }
                        ) {
                            rows { id }
                        }
                    }`
            }
        });

        expect(response.ok()).toBeTruthy();

        const json = await response.json();

        expect(json).toEqual({
            "data": {
                "providers": {
                    "rows": []
                }
            }
        });
    });

    test(`expected where mechanism is not null`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { mechanism: { isNotNull: true } },
                                orders: { id: { index: 1, direction: ASC } },
                                pagination: { pageSize: 9999, pageNumber: 1 }
                            }
                        ) {
                            rows { id }
                        }
                    }`
            }
        });

        expect(response.ok()).toBeTruthy();

        const json = await response.json();

        expect(json).toEqual({
            "data": {
                "providers": {
                    "rows": [
                        {"id": "10000"},
                        {"id": "10001"},
                        {"id": "10002"},
                        {"id": "10003"},
                        {"id": "10004"},
                        {"id": "10005"},
                        {"id": "10006"}
                    ]
                }
            }
        });
    });

    test(`expected where mechanism = SUPER_LOGICA`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { mechanism: { isEqual: { value: SUPER_LOGICA } } },
                                orders: { id: { index: 1, direction: ASC } },
                                pagination: { pageSize: 9999, pageNumber: 1 }
                            }
                        ) {
                            rows { id }
                        }
                    }`
            }
        });

        expect(response.ok()).toBeTruthy();

        const json = await response.json();

        expect(json).toEqual({
            "data": {
                "providers": {
                    "rows": [
                        {"id": "10002"}
                    ]
                }
            }
        });
    });

    test(`expected where mechanism != JETIMOB_V1`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { mechanism: { isNotEqual: { value: JETIMOB_V1 } } },
                                orders: { id: { index: 1, direction: ASC } },
                                pagination: { pageSize: 9999, pageNumber: 1 }
                            }
                        ) {
                            rows { id }
                        }
                    }`
            }
        });

        expect(response.ok()).toBeTruthy();

        const json = await response.json();

        expect(json).toEqual({
            "data": {
                "providers": {
                    "rows": [
                        {"id": "10001"},
                        {"id": "10002"},
                        {"id": "10003"},
                        {"id": "10004"},
                        {"id": "10005"},
                        {"id": "10006"}
                    ]
                }
            }
        });
    });

    test(`expected where is in (UNIVERSAL_SOFTWARE, ALAN_WGT)`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { mechanism: { isIn: { values: [UNIVERSAL_SOFTWARE, ALAN_WGT] } } },
                                orders: { id: { index: 1, direction: ASC } },
                                pagination: { pageSize: 9999, pageNumber: 1 }
                            }
                        ) {
                            rows { id }
                        }
                    }`
            }
        });

        expect(response.ok()).toBeTruthy();

        const json = await response.json();

        expect(json).toEqual({
            "data": {
                "providers": {
                    "rows": [
                        {"id": "10001"},
                        {"id": "10005"}
                    ]
                }
            }
        });
    });

    test(`expected where is not in (JETIMOB_V1, JETIMOB_V2, JETIMOB_V3, JETIMOB_V4)`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { mechanism: { isNotIn: { values: [JETIMOB_V1, JETIMOB_V2, JETIMOB_V3, JETIMOB_V4] } } },
                                orders: { id: { index: 1, direction: ASC } },
                                pagination: { pageSize: 9999, pageNumber: 1 }
                            }
                        ) {
                            rows { id }
                        }
                    }`
            }
        });

        expect(response.ok()).toBeTruthy();

        const json = await response.json();

        expect(json).toEqual({
            "data": {
                "providers": {
                    "rows": [
                        {"id": "10001"},
                        {"id": "10002"},
                        {"id": "10005"}
                    ]
                }
            }
        });
    });

});