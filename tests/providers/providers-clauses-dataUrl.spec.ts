import {expect, test} from "@playwright/test";

test.describe(`/api/graph: query { providers }`, () => {

    test(`expected where dataUrl is null`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { dataUrl: { isNull: true } }
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
                        {"id": "10006"}
                    ]
                }
            }
        });
    });

    test(`expected where dataUrl is not null`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { dataUrl: { isNotNull: true } },
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
                        {"id": "10005"}
                    ]
                }
            }
        });
    });

    test(`expected where dataUrl is blank`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { dataUrl: { isBlank: true } }
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

    test(`expected where dataUrl is not blank`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { dataUrl: { isNotBlank: true } },
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
                        {"id": "10005"}
                    ]
                }
            }
        });
    });

    test(`expected where dataUrl = "https://www.oliveiraimoveissm.com.br/imoveis/a-venda/"`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { dataUrl: { isEqual: { value: "https://www.oliveiraimoveissm.com.br/imoveis/a-venda/" } } },
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
                        {"id": "10000"}
                    ]
                }
            }
        });
    });

    test(`expected where dataUrl != "https://www.oliveiraimoveissm.com.br/imoveis/a-venda/"`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { dataUrl: { isNotEqual: { value: "https://www.oliveiraimoveissm.com.br/imoveis/a-venda/" } } },
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

    test(`expected where dataUrl is starting with "https://www"`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { dataUrl: { isStartingWith: { value: "https://www" } } },
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
                        {"id": "10005"}
                    ]
                }
            }
        });
    });

    test(`expected where dataUrl is not starting with "https://www"`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { dataUrl: { isNotStartingWith: { value: "https://www" } } },
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

    test(`expected where dataUrl is ending with "/"`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { dataUrl: { isEndingWith: { value: "/" } } },
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

    test(`expected where dataUrl is not ending with "/"`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { dataUrl: { isNotEndingWith: { value: "/" } } },
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
                        {"id": "10005"}
                    ]
                }
            }
        });
    });

    test(`expected where it contains ".net"`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { dataUrl: { itContains: { value: ".net" } } },
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

    test(`expected where it not contains ".net"`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { dataUrl: { itNotContains: { value: ".net" } } },
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
                        {"id": "10005"}
                    ]
                }
            }
        });
    });

    test(`expected where is in ("https://d3gy91ixuib5mq.cloudfront.net/", "https://www.cafeimobiliaria.com.br/jsons/")`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { dataUrl: { isIn: { values: ["https://d3gy91ixuib5mq.cloudfront.net/", "https://www.cafeimobiliaria.com.br/jsons/"] } } },
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

    test(`expected where is not in ("https://d3gy91ixuib5mq.cloudfront.net/", "https://www.cafeimobiliaria.com.br/jsons/")`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                clauses: { dataUrl: { isNotIn: { values: ["https://d3gy91ixuib5mq.cloudfront.net/", "https://www.cafeimobiliaria.com.br/jsons/"] } } },
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

});