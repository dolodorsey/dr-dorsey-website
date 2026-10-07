# Inner Circle venue revenue form recovery

The form now retains every selected asset, captures the form before awaiting the response, and clears loading on network or response failures. Uncertain outcomes retain entries and warn applicants to check for confirmation before submitting again.

Run `node tests/inner-circle-form.test.mjs`. Seven scenarios execute the actual extracted submit function and actual API handler with mocked state, event, form and persistence. They cover zero/one/multiple asset selections, successful reset after event.currentTarget clears, network rejection, server rejection, invalid JSON and preservation of the array through the handler. Brand remains inner_circle and workflow status remains pending; no marketing consent is added.

Baseline main 3887ae48018fbd500c83a1049abdc28b6afcd0a7 has the same form as deployed commit a65890141438e7bfcd7ebf788ffae9e5cd8d127b. Repository search found asset_interest only in this form; the handler preserves form_data. External consumers and database triggers are not covered by this source inspection.

These are isolated tests, not live inquiries. Actual browser lifecycle, concurrent submissions, backend persistence, CRM routing and independent QA remain pending. This parent Inner Circle inquiry does not establish a Memory Machine application or authority for any portfolio brand. No merge or production release is authorized by this draft.
