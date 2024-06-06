import {expect, test} from "@playwright/test";

test.describe(`/api/graph: query { providers }`, () => {

    test(`expected for all projections`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                orders: { id: { index: 1, direction: ASC } }
                                pagination: { pageSize: 1, pageNumber: 1 }
                            }
                        ) {
                            rows { id name siteUrl dataUrl mechanism params cronExpression logoUrl active }
                            pagination { pageSize pageNumber totalPages totalRows }
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
                        {
                            "id": "10000",
                            "name": "Oliveira Imóveis",
                            "siteUrl": "https://www.oliveiraimoveissm.com.br",
                            "dataUrl": "https://www.oliveiraimoveissm.com.br/imoveis/a-venda/",
                            "mechanism": "JETIMOB_V1",
                            "params": "",
                            "cronExpression": "0 0 0 ? * * *",
                            "logoUrl": null,
                            "active": true
                        }
                    ],
                    "pagination": {
                        "pageSize": 1,
                        "pageNumber": 1,
                        "totalPages": 7,
                        "totalRows": 7
                    }
                }
            }
        });
    });

    test(`expected for only rows projection`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                orders: { id: { index: 1, direction: ASC } }
                                pagination: { pageSize: 1, pageNumber: 1 }
                            }
                        ) {
                            rows { id name siteUrl dataUrl mechanism params cronExpression logoUrl active }
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
                        {
                            "id": "10000",
                            "name": "Oliveira Imóveis",
                            "siteUrl": "https://www.oliveiraimoveissm.com.br",
                            "dataUrl": "https://www.oliveiraimoveissm.com.br/imoveis/a-venda/",
                            "mechanism": "JETIMOB_V1",
                            "params": "",
                            "cronExpression": "0 0 0 ? * * *",
                            "logoUrl": null,
                            "active": true
                        }
                    ]
                }
            }
        });
    });

    test(`expected for only pagination projection`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                orders: { id: { index: 1, direction: ASC } }
                                pagination: { pageSize: 1, pageNumber: 1 }
                            }
                        ) {
                            pagination { pageSize pageNumber totalPages totalRows }
                        }
                    }`
            }
        });

        expect(response.ok()).toBeTruthy();

        const json = await response.json();

        expect(json).toEqual(expect.objectContaining({
            "errors": expect.arrayContaining([
                expect.objectContaining({"message": "INVALID_ARGUMENT: At least one projection must be defined"})
            ]),
            "data": null
        }));
    });

});