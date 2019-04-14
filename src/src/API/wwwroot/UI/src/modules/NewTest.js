import React from "react";
import { map } from "lodash";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";

import { Input, Button, UploadFile, Card } from "../components";

const NewTest = ({ texts }) => (
  <div {...{ className: "new-test" }}>
    <h1>{texts.NEW_TEST}</h1>
    <Card
      {...{
        content: (
          <CardContent>
            <Input
              {...{
                label: `${texts.NAME} *`,
                fullWidth: true,
                className: "margin-bottom"
              }}
            />
            <Input
              {...{
                label: `${texts.TEST_JSON_STRUCTURE} *`,
                fullWidth: true,
                className: "margin-bottom-very-small",
                multiline: true,
                rows: 3,
                rowsMax: 10
              }}
            />
            <UploadFile
              {...{
                label: texts.UPLOAD_FILE,
                closeButtonLabel: texts.CANCEL,
                dropZoneLabel: texts.DROP_FILE_HERE,
                className: "margin-bottom width-full"
              }}
            />
            <Input
              {...{
                label: texts.DESCRIPTION,
                fullWidth: true,
                className: "margin-bottom-big",
                multiline: true,
                rows: 3,
                rowsMax: 10
              }}
            />
            <Divider />
            <div {...{ className: "flex-row-space-between margin-top-small" }}>
              <p>{`* ${texts.REQUIRED}`}</p>
              <div {...{ className: "flex" }}>
                {map(
                  [
                    { label: texts.CANCEL, outlined: true },
                    {
                      label: texts.SUBMIT,
                      raised: true,
                      color: "primary",
                      className: "margin-left"
                    }
                  ],
                  (button, key) => (
                    <Button {...{ key, ...button }} />
                  )
                )}
              </div>
            </div>
          </CardContent>
        )
      }}
    />
  </div>
);

export default NewTest;
