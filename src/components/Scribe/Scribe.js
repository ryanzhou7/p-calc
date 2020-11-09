import React, { useState, useRef } from "react";
import * as CanvasHelper from "../../utils/CanvasHelper";
import * as AdjustUtils from "../Adjuster/utils";
import * as downloadReducer from "../../redux/downloadReducer";
import { useSelector, useDispatch } from "react-redux";

import {
  InputGroup,
  Card,
  FormControl,
  ToggleButton,
  ToggleButtonGroup,
  Button,
} from "react-bootstrap";
import "./index.css";

function Scribe(props) {
  const dispatch = useDispatch();

  const sex = useSelector((state) => state.downloadReducer.sex);
  const setSex = (sex) => {
    dispatch(downloadReducer.setSex(sex));
  };

  const threshold = useSelector((state) => state.downloadReducer.threshold);

  const age = useSelector((state) => state.downloadReducer.age);
  const setAge = (age) => {
    age = age.replaceAll(/[^0-9]+/g, "");
    dispatch(downloadReducer.setAge(age));
  };

  const note = useSelector((state) => state.downloadReducer.note);
  const setNote = (note) => {
    dispatch(downloadReducer.setNote(note));
  };

  const canvasRef = useRef(null);

  const imageSource = useSelector((state) => state.image.source);
  const combinedCanvasInfo = useSelector((state) => state.combinedCanvasInfo);

  const outerNumColoredPixels = combinedCanvasInfo.numColoredOuterPixels;
  const innerNumColoredPixels = combinedCanvasInfo.numColoredInnerPixels;

  let loss = AdjustUtils.calculatedLossPercent(
    outerNumColoredPixels,
    innerNumColoredPixels
  );

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>Additional information: </Card.Title>

          <InputGroup
            type="number"
            className="mb-3 mx-auto"
            style={{ maxWidth: "100px" }}
          >
            <label className="mr-2" htmlFor="age">
              Age:
            </label>
            <FormControl
              id="age"
              onChange={(e) => setAge(e.target.value)}
              value={age}
            />
          </InputGroup>

          <label className="mr-2" htmlFor="sex">
            Sex:
          </label>
          <span>
            <ToggleButtonGroup
              name="sex"
              type="radio"
              value={sex}
              onChange={(value) => setSex(value)}
            >
              <ToggleButton
                variant={"Male" === sex ? "primary" : "outline-primary"}
                value={"Male"}
              >
                Male
              </ToggleButton>
              <ToggleButton
                variant={"" === sex ? "primary" : "outline-primary"}
                value={""}
              >
                N/A
              </ToggleButton>
              <ToggleButton
                variant={"Female" === sex ? "primary" : "outline-primary"}
                value={"Female"}
              >
                Female
              </ToggleButton>
            </ToggleButtonGroup>
          </span>

          <div className="mt-3">
            <label className="mb-1" htmlFor="notes">
              Notes:
            </label>
            <InputGroup className="mb-3">
              <FormControl
                id="notes"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </InputGroup>
          </div>

          <div className="mt-4">
            <Button
              variant="primary"
              onClick={() =>
                CanvasHelper.download(
                  imageSource,
                  combinedCanvasInfo.canvas,
                  canvasRef,
                  {
                    sex,
                    age,
                    note,
                    loss,
                    threshold,
                  }
                )
              }
              size="lg"
            >
              Download
            </Button>
          </div>
        </Card.Body>
      </Card>
      <canvas style={{ display: "none" }} ref={canvasRef} />
    </>
  );
}

export default Scribe;
