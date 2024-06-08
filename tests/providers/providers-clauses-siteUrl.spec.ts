import {expect, test} from "@playwright/test";

test.describe(`/api/graph: query { providers }`, () => {

    test(`expected where siteUrl is null`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { siteUrl: { isNull: true } }
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

    test(`expected where siteUrl is not null`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { siteUrl: { isNotNull: true } },
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

    test(`expected where siteUrl is blank`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { siteUrl: { isBlank: true } }
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

    test(`expected where siteUrl is not blank`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { siteUrl: { isNotBlank: true } },
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

    test(`expected where siteUrl = "https://www.cafeimobiliaria.com.br"`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { siteUrl: { isEqual: { value: "https://www.cafeimobiliaria.com.br" } } },
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

    test(`expected where siteUrl != "https://www.cotrelimoveis.com.br"`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { siteUrl: { isNotEqual: { value: "https://www.cotrelimoveis.com.br" } } },
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

    test(`expected where siteUrl is starting with "https://www"`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { siteUrl: { isStartingWith: { value: "https://www" } } },
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
                        {"id": "10002"},
                        {"id": "10004"},
                        {"id": "10005"},
                        {"id": "10006"}
                    ]
                }
            }
        });
    });

    test(`expected where siteUrl is not starting with "https://www"`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { siteUrl: { isNotStartingWith: { value: "https://www" } } },
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
                        {"id": "10003"}
                    ]
                }
            }
        });
    });

    test(`expected where siteUrl is ending with "imoveis.com.br"`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { siteUrl: { isEndingWith: { value: "imoveis.com.br" } } },
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
                        {"id": "10004"},
                        {"id": "10006"}
                    ]
                }
            }
        });
    });

    test(`expected where siteUrl is not ending with "imoveis.com.br"`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { siteUrl: { isNotEndingWith: { value: "imoveis.com.br" } } },
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
                        {"id": "10002"},
                        {"id": "10003"},
                        {"id": "10005"}
                    ]
                }
            }
        });
    });

    test(`expected where it contains "imoveissm"`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { siteUrl: { itContains: { value: "imoveissm" } } },
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
                        {"id": "10005"}
                    ]
                }
            }
        });
    });

    test(`expected where it not contains "imoveissm"`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { siteUrl: { itNotContains: { value: "imoveissm" } } },
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
                        {"id": "10006"}
                    ]
                }
            }
        });
    });

    test(`expected where is in ("https://cancianimoveis.com.br", "https://www.cafeimobiliaria.com.br")`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { siteUrl: { isIn: { values: ["https://cancianimoveis.com.br", "https://www.cafeimobiliaria.com.br"] } } },
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
                        {"id": "10002"}
                    ]
                }
            }
        });
    });

    test(`expected where is not in ("https://cancianimoveis.com.br", "https://www.cafeimobiliaria.com.br")`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { siteUrl: { isNotIn: { values: ["https://cancianimoveis.com.br", "https://www.cafeimobiliaria.com.br"] } } },
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