import React, { useEffect, useState } from "react";

import CoreFormButton from "./CoreFormButton";
import { BUTTON_TYPE, INPUT_TYPE } from "./coreFormConstants";
import {
  checkDependencies,
  createFormActionProps,
  createFormFieldProps,
  detectChange,
  getDependentProps
} from "../../utils/formUtils";
import CoreContainedButton from "../inputs/CoreContainedButton";
import CoreInput from "../inputs/CoreInput";
import CoreOutlinedButton from "../inputs/CoreOutlinedButton";
import CoreBox from "../layouts/CoreBox";

export default function CoreFormInputs(props) {
  const {
    type,
    forms,
    formId,
    element,
    formikprops,
    preview,
    handleButtonCLick,
    submitLoading,
    OnCancelClick,
  } = props;

  const [elementProps, setElementProps] = useState({});
  const [tempProps, setTempProps] = useState({});
  const [oldData, setOldData] = useState(null);

  useEffect(() => {
    if (element?.dependencies?.props?.getProps) {
      let data = { ...(oldData || {}) };

      let changeDetected = detectChange(
        element,
        forms,
        elementProps?.formik,
        type,
        formId,
        data
      );

      if (changeDetected) {
        let changedProps = getDependentProps(
          element?.dependencies?.props?.getProps,
          formikprops,
          element,
          forms[formId]?.formElements
        );

        data = { ...formikprops };
        setOldData(data);
        setTempProps(changedProps);
        
        if(changedProps.calculatedValue && changedProps.calculatedValue !== elementProps.value){
          formikprops?.setFieldValue(element?.id, changedProps.calculatedValue);
        }

      }
    }
  });

  useEffect(() => {
    if (element && type === INPUT_TYPE) {
      if(element.isDependent && tempProps){
        let mainProps = createFormFieldProps(props, "edit");
        let newProps = { ...mainProps, ...tempProps };
          
        setElementProps({ ...newProps });
        setTempProps(null);
      }
      else{
        let mainProps = createFormFieldProps(props, "edit");

        setElementProps({ ...mainProps });
      }
    }
  }, [
    element,
    props,
    formikprops?.values && formikprops?.values[element?.id],
    formikprops?.errors && formikprops?.errors[element?.id],
    formikprops?.touched && formikprops?.touched[element?.id],
    tempProps
  ]);

  useEffect(() => {
    if (element && type === INPUT_TYPE) {
      let mainProps = createFormFieldProps(props, "edit");

      // eslint-disable-next-line no-console
      console.log("CHANGE", mainProps);
      setElementProps(mainProps);
    }
  }, []);

  // eslint-disable-next-line no-console
  console.log("FORM INPUTS", elementProps);

  return type === INPUT_TYPE ? (
    element?.comp && !checkDependencies(element, formikprops)?.hide ? (
      React.createElement(
        element?.comp ? element?.comp : CoreInput,
        elementProps,
        element?.onlyView ? element?.label : null
      )
    ) : null
  ) : type === BUTTON_TYPE ? (
    <CoreBox xs={12} {...createFormActionProps(forms[formId])}>
      {forms[formId]?.formActions?.map((actionElement, i) => (
        <CoreFormButton
          key={"form-action-" + i}
          element={actionElement}
          formikprops={formikprops}
          handleButtonCLick={handleButtonCLick}
          submitLoading={submitLoading}
        />
      ))}

      {forms[formId]?.allowCancel !== false && (
        <CoreOutlinedButton
          key={"form-cancel"}
          label={
            forms[formId]?.cancelButtonLabel
              ? forms[formId].cancelButtonLabel
              : "Cancel"
          }
          disabled={submitLoading || preview}
          OnClick={OnCancelClick}
        />
      )}

      {forms[formId]?.allowSubmit !== false && (
        <CoreContainedButton
          key={"form-edit"}
          label={
            forms[formId]?.submitButtonLabel
              ? forms[formId].submitButtonLabel
              : "Save"
          }
          disabled={submitLoading || preview}
          type="submit"
          OnClick={formikprops.handleSubmit}
        />
      )}
    </CoreBox>
  ) : null;
}