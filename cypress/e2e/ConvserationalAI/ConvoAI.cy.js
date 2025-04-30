describe('Conversational AI API Tests - Validation', () => {
    it('should validate the response structure and customer_facing_answer', () => {
        // Define the request body
        const requestBody = {
            question: 'account',
            cif: '00001',
            conversation_id: 'a081e212-1bb4-4d63-aceb-3b8aaddc0f62',
            language: 'en',
        };

        // Send the POST request
        cy.api({
            method: 'POST',
            url: 'api/v1/conversation/',
            body: requestBody,
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            // Validate the response status
            expect(response.status).to.eq(200);

            // Log the response body
            cy.log('Response Body:', JSON.stringify(response.body));

            

            // Check if llm_response exists
            if (response.body.llm_response) {
                // Validate the presence of additional_kwargs
                expect(response.body.llm_response).to.have.property('additional_kwargs');
                const additionalKwargs = response.body.llm_response.additional_kwargs;

                // Validate the presence of tool_calls
                expect(additionalKwargs).to.have.property('tool_calls');
                const toolCalls = additionalKwargs.tool_calls;

                // Validate the presence of customer_facing_answer in the first tool_call
                expect(toolCalls[0].args).to.have.property('customer_facing_answer');
                const customerFacingAnswer = toolCalls[0].args.customer_facing_answer;

                // Assert the value of customer_facing_answer
                expect(customerFacingAnswer).to.contains(
                    'Welcome to RAKBANK Digital Banking. How may I assist you today?'
                );
            } else {
                // If llm_response does not exist, log a message
                cy.log('llm_response does not exist in the response body.');
            }
        });
    });
});