import {expect, test} from '@playwright/test';
import _ from 'lodash';

test.describe(`/api/graph: query { providers }`, () => {

    const slices = [
        {pageNumber: 1, id: {start: 10000, end: 10002}},
        {pageNumber: 2, id: {start: 10003, end: 10005}},
        {pageNumber: 3, id: {start: 10006, end: 10006}}
    ];

    for (const params of slices) {
        test(`given order=id asc, pageNumber=${params.pageNumber} then expects ids between ${params.id.start} and ${params.id.end}`, async ({request}) => {
            const response = await request.post(`${process.env.API_URL}/api/graphql`, {
                data: {
                    query: `query {
                        providers(
                            input: {
                                orders: { id: { index: 1, direction: ASC } }
                                pagination: { pageSize: 3, pageNumber: ${params.pageNumber} }
                            }
                        ) {
                            rows { id }
                            pagination { pageSize pageNumber totalPages totalRows }
                        }
                    }`
                }
            });

            expect(response.ok()).toBeTruthy();

            const json = await response.json();

            const expected = {
                data: {
                    providers: {
                        rows: _.range(params.id.start, params.id.end + 1).map(id => ({id: `${id}`})),
                        pagination: {
                            pageSize: 3,
                            pageNumber: params.pageNumber,
                            totalPages: 3,
                            totalRows: 7
                        }
                    }
                }
            };

            expect(json).toEqual(expected);
        });
    }

});
