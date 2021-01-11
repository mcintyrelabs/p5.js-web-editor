export default ({
  domain,
  headingText,
  greetingText,
  messageText,
  link,
  buttonText,
  directLinkText,
  noteText,
  meta
}) => (
  `
<mjml>
  <mj-head>
    <mj-raw>
      <meta name="keywords" content="${meta.keywords}" />
      <meta name="description" content="${meta.description}" />
    </mj-raw>
  </mj-head>
  <mj-body>
    <mj-container>
      <mj-section>
        <mj-column>
          <mj-image width="192" src="${domain}/images/computiful-square-logo.png" alt="computiful" />
          <mj-divider border-color="#1E90FF"></mj-divider>
        </mj-column>
      </mj-section>

      <mj-section>
        <mj-column>
          <mj-text font-size="20px" color="#333333" font-family="sans-serif">
            ${headingText}
          </mj-text>
        </mj-column>
      </mj-section>

      <mj-section>
        <mj-column>
          <mj-text color="#333333">
            ${greetingText}
          </mj-text>
          <mj-text color="#333333">
            ${messageText}
          </mj-text>
          <mj-button background-color="#1E90FF" href="${link}">
            ${buttonText}
          </mj-button>
        </mj-column>
      </mj-section>

      <mj-section>
        <mj-column>
          <mj-text color="#333333">
            ${directLinkText}
          </mj-text>
          <mj-text align="center" color="#333333"><a href="${link}">${link}</a></mj-text>
          <mj-text color="#333333">
            ${noteText}
          </mj-text>
        </mj-column>
      </mj-section>
    </mj-container>
  </mj-body>
</mjml>
`
);
