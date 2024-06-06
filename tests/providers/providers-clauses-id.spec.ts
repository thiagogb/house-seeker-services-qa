import {expect, test} from "@playwright/test";

test.describe(`/api/graph: query { providers }`, () => {

    test(`expected where id is null`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { id: { isNull: true } }
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

    test(`expected where id is not null`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { id: { isNotNull: true } },
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

    test(`expected where id = 10000`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { id: { isEqual: { value: 10000 } } }
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
                    "rows": [{"id": "10000"}]
                }
            }
        });
    });

    test(`expected where id != 10000`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { id: { isNotEqual: { value: 10000 } } },
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

    test(`expected where id > 10003`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { id: { isGreater: { value: 10003 } } },
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
                        {"id": "10004"},
                        {"id": "10005"},
                        {"id": "10006"}
                    ]
                }
            }
        });
    });

    test(`expected where id >= 10003`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { id: { isGreaterOrEqual: { value: 10003 } } },
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
                        {"id": "10003"},
                        {"id": "10004"},
                        {"id": "10005"},
                        {"id": "10006"}
                    ]
                }
            }
        });
    });

    test(`expected where id < 10003`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { id: { isLesser: { value: 10003 } } },
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
                        {"id": "10002"}
                    ]
                }
            }
        });
    });

    test(`expected where id <= 10003`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { id: { isLesserOrEqual: { value: 10003 } } },
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
                        {"id": "10003"}
                    ]
                }
            }
        });
    });

    //todo: other clauses

});