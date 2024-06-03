import {expect, test} from "@playwright/test";

test.describe(`/api/graph: query { providers }`, () => {

    test(`expected for all projections`, async ({request}) => {
        const response = await request.post(`${process.env.API_URL}/api/graphql`, {
            data: {
                query: `query {
                        providers(
                            input: {
                                orders: { id: { index: 1, direction: ASC } }
                                pagination: { pageSize: 5, pageNumber: 1 }
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
                        },
                        {
                            "id": "10001",
                            "name": "Cancian Imóveis",
                            "siteUrl": "https://cancianimoveis.com.br",
                            "dataUrl": "https://d3gy91ixuib5mq.cloudfront.net/",
                            "mechanism": "UNIVERSAL_SOFTWARE",
                            "params": "",
                            "cronExpression": "0 0 0 ? * * *",
                            "logoUrl": null,
                            "active": true
                        },
                        {
                            "id": "10002",
                            "name": "Café Imobiliária",
                            "siteUrl": "https://www.cafeimobiliaria.com.br",
                            "dataUrl": "https://www.cafeimobiliaria.com.br/jsons/",
                            "mechanism": "SUPER_LOGICA",
                            "params": "{\"jsonFile\":\"cafeimoveis.json\"}",
                            "cronExpression": "0 0 0 ? * * *",
                            "logoUrl": null,
                            "active": true
                        },
                        {
                            "id": "10003",
                            "name": "Maiquel Oliveira",
                            "siteUrl": "https://maiqueloliveira.com.br",
                            "dataUrl": "",
                            "mechanism": "JETIMOB_V2",
                            "params": "{\"subTypes\":[\"Apartamento\",\"Casa\",\"Casa de Condomínio\",\"Cobertura\",\"Sobrado\",\"Terreno\"]}",
                            "cronExpression": "0 0 0 ? * * *",
                            "logoUrl": null,
                            "active": true
                        },
                        {
                            "id": "10004",
                            "name": "Luiz Coelho Imóveis",
                            "siteUrl": "https://www.luizcoelhoimoveis.com.br",
                            "dataUrl": "",
                            "mechanism": "JETIMOB_V3",
                            "params": "",
                            "cronExpression": "0 0 0 ? * * *",
                            "logoUrl": null,
                            "active": true
                        }
                    ],
                    "pagination": {
                        "pageSize": 5,
                        "pageNumber": 1,
                        "totalPages": 2,
                        "totalRows": 7
                    }
                }
            }
        });
    });

});