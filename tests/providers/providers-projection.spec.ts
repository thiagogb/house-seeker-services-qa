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
                    "rows": [{
                        "id": "1",
                        "name": "Oliveira Imóveis",
                        "siteUrl": "https://www.oliveiraimoveissm.com.br",
                        "dataUrl": "https://www.oliveiraimoveissm.com.br/imoveis/a-venda/",
                        "mechanism": "JETIMOB_V1",
                        "params": "",
                        "cronExpression": "0 0 9 ? * MON,WED,FRI *",
                        "logoUrl": "http://127.0.0.1:8080/api/rest/providers/1/logo",
                        "active": false
                    }, {
                        "id": "2",
                        "name": "Fernando Flores",
                        "siteUrl": "https://www.fernandoflores.com.br",
                        "dataUrl": "https://www.fernandoflores.com.br/imoveis/a-venda/",
                        "mechanism": "JETIMOB_V1",
                        "params": "",
                        "cronExpression": "0 0 9 ? * MON,WED,FRI *",
                        "logoUrl": null,
                        "active": false
                    }, {
                        "id": "3",
                        "name": "Toneto Empreendimentos",
                        "siteUrl": "https://www.tonetoempreendimentos.com.br",
                        "dataUrl": "https://www.tonetoempreendimentos.com.br/imoveis/a-venda/",
                        "mechanism": "JETIMOB_V1",
                        "params": "",
                        "cronExpression": "0 0 9 ? * MON,WED,FRI *",
                        "logoUrl": null,
                        "active": false
                    }, {
                        "id": "4",
                        "name": "Hanover Imobiliária",
                        "siteUrl": "https://www.imobiliariahanover.com.br",
                        "dataUrl": "https://www.imobiliariahanover.com.br/imoveis/a-venda/",
                        "mechanism": "JETIMOB_V1",
                        "params": "",
                        "cronExpression": "0 0 9 ? * MON,WED,FRI *",
                        "logoUrl": "http://127.0.0.1:8080/api/rest/providers/4/logo",
                        "active": false
                    }, {
                        "id": "5",
                        "name": "Zimbro Imóveis",
                        "siteUrl": "https://www.zimbroimoveis.com.br",
                        "dataUrl": "https://www.zimbroimoveis.com.br/imoveis/a-venda/",
                        "mechanism": "JETIMOB_V1",
                        "params": "",
                        "cronExpression": "0 0 9 ? * MON,WED,FRI *",
                        "logoUrl": null,
                        "active": false
                    }],
                    "pagination": {"pageSize": 5, "pageNumber": 1, "totalPages": 13, "totalRows": 65}
                }
            }
        });
    });

});