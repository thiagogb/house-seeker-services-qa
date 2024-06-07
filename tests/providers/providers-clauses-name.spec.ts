import {expect, test} from "@playwright/test";

test.describe(`/api/graph: query { providers }`, () => {

    test(`expected where name is null`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { name: { isNull: true } }
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

    test(`expected where name is not null`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { name: { isNotNull: true } },
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

    test(`expected where name is blank`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { name: { isBlank: true } }
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

    test(`expected where name is not blank`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { name: { isNotBlank: true } },
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

    test(`expected where name = "Cancian Imóveis"`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { name: { isEqual: { value: "Cancian Imóveis" } } },
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
                        {"id": "10001"}
                    ]
                }
            }
        });
    });

    test(`expected where name != "Cotrel Imóveis"`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { name: { isNotEqual: { value: "Cotrel Imóveis" } } },
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
                        {"id": "10005"}
                    ]
                }
            }
        });
    });

    test(`expected where name is starting with "Café"`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { name: { isStartingWith: { value: "Café" } } },
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

    test(`expected where name is not starting with "Café"`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { name: { isNotStartingWith: { value: "Café" } } },
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
                        {"id": "10003"},
                        {"id": "10004"},
                        {"id": "10005"},
                        {"id": "10006"}
                    ]
                }
            }
        });
    });

    test(`expected where name is ending with "Imóveis"`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { name: { isEndingWith: { value: "Imóveis" } } },
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
                        {"id": "10004"},
                        {"id": "10005"},
                        {"id": "10006"}
                    ]
                }
            }
        });
    });

    test(`expected where name is not ending with "Imóveis"`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { name: { isNotEndingWith: { value: "Imóveis" } } },
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
                        {"id": "10002"},
                        {"id": "10003"}
                    ]
                }
            }
        });
    });

    test(`expected where it contains "Imob"`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { name: { itContains: { value: "Imob" } } },
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

    test(`expected where it not contains "Imob"`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { name: { itNotContains: { value: "Imob" } } },
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
                        {"id": "10003"},
                        {"id": "10004"},
                        {"id": "10005"},
                        {"id": "10006"}
                    ]
                }
            }
        });
    });

    test(`expected where is in ("Oliveira Imóveis", "Cancian Imóveis")`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { name: { isIn: { values: ["Oliveira Imóveis", "Cancian Imóveis"] } } },
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
                        {"id": "10001"}
                    ]
                }
            }
        });
    });

    test(`expected where is not in ("Oliveira Imóveis", "Cancian Imóveis")`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { name: { isNotIn: { values: ["Oliveira Imóveis", "Cancian Imóveis"] } } },
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

});