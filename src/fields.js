const fields = [
    {
      "field_is": "text_fields",
      "name": "name",
      "label": "Name",
      "placeholder": "Enter your name",
      "default_value": "",
      "type": "text",
      "helper_text": "",
      "variant": "outlined",
      "error": "This field is required",
      "filters": {
        "auto_complete": true,
        "auto_focus": true,
        "required": true,
        "hideLabel": false,
        "validations": true,
        "fullWidth": true
      },
      "controller": {
        "rules": {
          "required": "Please enter your name",
          "minLength": {
            "value": 5,
            "message": "Minimum length is  characters"
          },
          "maxLength": {
            "value": 20,
            "message": "Maximum length is 20 characters"
          }
        }
      }
    },
    {
      "field_is": "selector",
      "name": "country",
      "label": "Country",
      "options": [
        { "label": "USA", "value": "USA" },
        { "label": "Canada", "value": "Canada" },
        { "label": "UK", "value": "UK" },
        { "label": "Australia", "value": "Australia" }
      ],
      "default_value": "",
      "type": "dropdown",
      "helper_text": "",
      "variant": "outlined",
      "filters": {
        "auto_complete": true,
        "auto_focus": false,
        "error": false,
        "disabled": false,
        "required": true,
        "hideLabel": false,
        "validations": true,
        "fullWidth": true
      },
      "controller": {
        "rules": {
          "required": {
            "value": true,
            "message": "Please select a country"
          },
          "validate": {
            "allowedValues": value => ["USA", "Canada", "UK", "Australia"].includes(value) || "Please select a valid country from the list."
          }
        }
      }
    },
    {
      "field_is": "toggle_button",
      "name": "toggle",
      "label": "Switch",
      "default_value": false,
      "type": "boolean",
      "style": {},
      "helper_text": "",
      "variant": "",
      "filters": {
        "auto_complete": false,
        "auto_focus": false,
        "multiline": false,
        "disabled": false,
        "required": false,
        "hideLabel": false,
        "fullWidth": true
      },
      "validations": {
        "customValidation": "validateToggle",
        "customErrorMessage": "Please customize this error message",
        "minValue": false,
        "maxValue": true,
        "mustBeTrue": true,
        "mustBeFalse": false
      },
      "controller": {
        "name": "",
        "control": "",
        "rules": {
          "validateToggle": {
            "rule": value => value === true || value === false,
            "message": "Toggle value must be either true or false."
          },
          "minValue": {
            "rule": value => value === false,
            "message": "Minimum value should be false."
          },
          "maxValue": {
            "rule": value => value === true,
            "message": "Maximum value should be true."
          },
          "mustBeTrue": {
            "rule": value => value === true,
            "message": "The toggle must be set to true."
          },
          "mustBeFalse": {
            "rule": value => value === false,
            "message": "The toggle must be set to false."
          }
        }
      }
    },
    {
        "field_is": "autocomplete",
        "name": "autocomplete",
        "label": "Autocomplete",
        "placeholder": "Start typing...",
        "default_value": [], 
        "type": "autocomplete",
        "style": {},
        "helper_text": "",
        "variant": "",
        "options": [
          { "label": "Option 1", "value": "Option 1" },
          { "label": "Option 2", "value": "Option 2" },
          { "label": "Option 3", "value": "Option 3" }
        ],
        "filters": {
          "auto_complete": true,
          "error": false,
          "hideLabel": false,
          "auto_focus": true,
          "disabled": false,
          "required": true,
          "autoHighlight": false,
          "autoSelect": false,
          "multiple": true,
          "validations": true,
          "fullWidth": true
        },
        "controller": {
          "rules": {
            "required": {
                "value": true,
                "message": "Please select an option"
              },
            "allowedValues": {
              "rule": value => value.length === 0 || value.every(item => ['Option 1', 'Option 2', 'Option 3'].includes(item)),
              "message": "Invalid option selected."
            },
            "minSelections": {
              "rule": value => value.length >= 1,
              "message": "Please select at least 1 option."
            },
            "maxSelections": {
              "rule": value => value.length <= 3,
              "message": "You cannot select more than 3 options."
            },
            "validateOptionLength": {
              "rule": value => value.every(item => item.length >= 3 && item.length <= 20),
              "message": "Option length should be between 3 and 20 characters."
            },
            "minOptionLength": {
              "rule": value => value.every(item => item.length >= 3),
              "message": "Option length should be at least 3 characters."
            },
            "maxOptionLength": {
              "rule": value => value.every(item => item.length <= 20),
              "message": "Option length cannot exceed 20 characters."
            },
            "validateOptionFormat": {
              "rule": value => value.every(item => /^[a-zA-Z0-9]+$/.test(item)),
              "message": "Option format is invalid. Only alphanumeric characters are allowed."
            }
          },
          "custom": {}
        }
      },
      {
        "field_is": "checkbox",
        "name": "checkbox",
        "label": "Checkbox",
        "default_value": false,
        "type": "checkbox",
        "style": {
          
        },
        "helper_text": "",
        "variant": "",
        "filters": {
          "auto_complete": true,
          "auto_focus": true,
          "error": false,
          "disabled": false,
          "required": true,
          "hideLabel": false,
          "validations": true,
          "fullWidth": true
        },
        "controller": {
          "name": "",
          "control": "",
          "rules": {
            
            "customValidation": {
              "rule": "value => validateCheckbox(value)",
              "message": "Custom validation failed. Please customize this error message."
            },
            "customErrorMessage": {
              "rule": "value => value.trim().length > 0",
              "message": "Please customize this error message."
            },
            "mustBeTrue": {
              "rule": "value => value === true",
              "message": "The checkbox must be checked."
            }
          }
        },
        "custom": {
          
        }
      },
      {
        "field_is": "slider",
        "name": "slider",
        "label": "",
        "default_value": "20",
        "type": "slider",
        "style": {
          
        },
        "helper_text": "",
        "variant": "outlined",
        "options": {
          "min": 0,
          "max": 100,
          "step": 1
        },
        "filters": {
          "auto_complete": true,
          "auto_focus": true,
          "error": false,
          "disabled": false,
          "required": true,
          "hideLabel": false,
          "validations": true,
          "fullWidth": true
        },
        "controller": {
          "name": "",
          "control": "",
          "rules": {
            "required": {
                "value": true,
                "message": "Please slide"
              },
            "customValidation": {
              "rule": "value => validateSlider(value)",
              "message": "Custom validation failed. Please customize this error message."
            },
            "customErrorMessage": {
              "rule": "value => value.trim().length > 0",
              "message": "Please customize this error message."
            },
            "minValue": {
              "rule": "value => value >= 0",
              "message": "Value must be greater than or equal to 0."
            },
            "maxValue": {
              "rule": "value => value <= 10",
              "message": "Value must be less than or equal to 100."
            },
            "step": {
              "rule": "value => value % 1 === 0",
              "message": "Step must be a whole number."
            }
          },
          "custom": {
            
          }
        }
    },
    {
        "field_is": "rating",
        "name": "rating",
        "label": "",
        "default_value": 0,
        "type": "rating",
        "style": {},
        "helper_text": "",
        "variant": "",
        "options": {
          "min": 0,
          "max": 5,
          "precision": 1
        },
        "filters": {
          "auto_focus": false,
          "error": false,
          "disabled": false,
          "required": true,
          "hideLabel": false,
          "validations": true,
          "fullWidth": true
        },
        "controller": {
          "name": "",
          "control": "",
          "rules": {
            "customValidation": {
              "rule": "value => validateRating(value)",
              "message": "Custom validation failed. Please customize this error message."
            },
            "customErrorMessage": {
              "rule": "value => value.trim().length > 0",
              "message": "Please customize this error message."
            },
            "minValue": {
              "rule": "value => value >= 0",
              "message": "Value must be greater than or equal to 0."
            },
            "maxValue": {
              "rule": "value => value <= 5",
              "message": "Value must be less than or equal to 5."
            },
            "step": {
              "rule": "value => value % 0.5 === 0",
              "message": "Step must be a multiple of 0.5."
            }
          }
        },
        "custom": {}
      },
      {
        "field_is": "radio_group",
        "name": "gender",
        "label": "",
        "default_value": "",
        "type": "",
        "options": [
          {
            "label": "Male",
            "value": "male"
          },
          {
            "label": "Female",
            "value": "female"
          },
          {
            "label": "Other",
            "value": "other"
          }
        ],
        "style": {},
        "helper_text": "",
        "variant": "outlined",
        "filters": {
          "auto_focus": true,
          "error": false,
          "disabled": false,
          "required": true,
          "hideLabel": false,
          "validations": true,
          "fullWidth": true
        },
        "controller": {
          "name": "",
          "control": "",
          "rules": {
            "required": {
                "value": true,
                "message": "Please Select"
              },
            "customValidation": {
              "rule": "value => validateRadioGroup(value)",
              "message": "Custom validation failed. Please customize this error message."
            },
            "customErrorMessage": {
              "rule": "value => value.trim().length > 0",
              "message": "Please customize this error message."
            },
            "allowedValues": {
              "rule": "value => value.every(item => ['male', 'female', 'other'].includes(item))",
              "message": "Invalid gender selection."
            },
            "minSelections": {
              "rule": "value => value.length >= 1",
              "message": "Please select at least 1 option."
            },
            "maxSelections": {
              "rule": "value => value.length <= 1",
              "message": "You can only select 1 option."
            }
          }
        },
        "custom": {}
      },
      {
        "field_is": "datetime_picker",
        "name": "event_date",
        "label": "",
        "default_value": "",
        "type": "datetime",
        "style": {},
        "helper_text": "",
        "variant": "outlined",
        "filters": {
          "auto_focus": false,
          "error": false,
          "disabled": false,
          "required": true,
          "hideLabel": false,
          "validations": true,
          "fullWidth": true
        },
        "controller": {
          "name": "",
          "control": "",
          "rules": {
            "required": {
                "value": true,
                "message": "Select the date and time of the event"
              },
            "customValidation": {
              "rule": "value => validateDateTime(value)",
              "message": "Custom validation failed. Please customize this error message."
            },
            "customErrorMessage": {
              "rule": "value => value.trim().length > 0",
              "message": "Please customize this error message."
            },
            "minDate": {
              "rule": "value => new Date(value) >= new Date('2024-01-01')",
              "message": "Date must be on or after January 1, 2024."
            },
            "maxDate": {
              "rule": "value => new Date(value) <= new Date('2025-12-31')",
              "message": "Date must be on or before December 31, 2025."
            }
          }
        },
        "custom": {}
      },
      {
        "field_is": "multiple_selector",
        "name": "multiple_selector",
        "label": "Multiple Selector",
        "options": [
          { "value": "USA", "label": "United States" },
          { "value": "Canada", "label": "Canada" },
          { "value": "UK", "label": "United Kingdom" },
          { "value": "Australia", "label": "Australia" }
        ],
        "default_value": [],
        "type": "dropdown",
        "style": {},
        "helper_text": "",
        "variant": "outlined",
        "filters": {
          "auto_complete": true,
          "auto_focus": false,
          "error": false,
          "multiline": false,
          "disabled": false,
          "required": true,
          "hideLabel": false,
          "validations": true,
          "fullWidth": true
        },
        "controller": {
          "name": "country_selector",
          "control": "",
          "rules": {
            "required": {
                "value": true,
                "message": "Please Select at least one country"
              },
           
          }
        },
        "custom": {}
      },
    //   {
    //     field_is: "circular_integration",
    //     name: "circular integration",
    //     label: "CI",
    //     default_value: false,
    //     type: "boolean",
    //     style: {},
    //     helper_text: "",
    //     variant: "",
    //     filters: {
    //       auto_complete: false,
    //       auto_focus: false,
    //       multiline: false,
    //       disabled: false,
    //       required: false,
    //       hideLabel: false,
    //       fullWidth: true
    //     },
    //     controller: {
    //       name: "toggle",
    //       control: "",
    //       rules: {
    //         validateToggle: {
    //           rule: value => value === true || value === false,
    //           message: "Toggle value must be either true or false."
    //         },
    //         minValue: {
    //           rule: value => value === false,
    //           message: "Minimum value should be false."
    //         },
    //         maxValue: {
    //           rule: value => value === true,
    //           message: "Maximum value should be true."
    //         },
    //         mustBeTrue: {
    //           rule: value => value === true,
    //           message: "The toggle must be set to true."
    //         },
    //         mustBeFalse: {
    //           rule: value => value === false,
    //           message: "The toggle must be set to false."
    //         }
    //       }
    //     },
    //     custom: {
    //       circularProgress: {
    //         integration: true,
    //         color: "primary",
    //         size: 40,
    //         thickness: 4
    //       }
    //     }
    //   },

    
    {
        "field_is": "password",
        "name": "password",
        "label": "",
        "placeholder": "Enter your password",
        "default_value": "",
        "type": "password",
        "helper_text": "",
        "variant": "outlined",
        "error": "This field is required",
        "filters": {
          "auto_complete": true,
          "auto_focus": false,
          "required": true,
          "hideLabel": false,
          "validations": true,
          "fullWidth": true
        },
        "controller": {
          "rules": {
            "required": "Please enter your password",
            
            "minLength": {
              "value": 6,
              "message": "Minimum length is 6 characters"
            },
            "maxLength": {
              "value": 10,
              "message": "Maximum length is 10 characters"
            },
            "noWhitespace": {
              "value": /^\S+$/,
              "message": "Whitespace is not allowed"
            },
            "containsUppercase": {
              "value": /[A-Z]/,
              "message": "Password must contain at least one uppercase letter"
            },
            "containsLowercase": {
              "value": /[a-z]/,
              "message": "Password must contain at least one lowercase letter"
            },
            "containsNumber": {
              "value": /[0-9]/,
              "message": "Password must contain at least one number"
            },
            "containsSpecialCharacter": {
              "value": /[^A-Za-z0-9]/,
              "message": "Password must contain at least one special character"
            }
          }
        }
      },
      
        {
          "field_is": "email",
          "name": "email",
          "label": "",
          "placeholder": "Enter your email",
          "default_value": "",
          "type": "email",
          "helper_text": "",
          "variant": "outlined",
          "error": "This field is required",
          "filters": {
            "auto_complete": true,
            "auto_focus": false,
            "required": true,
            "hideLabel": false,
            "validations": true,
            "fullWidth": true
          },
          "controller": {
            "rules": {
              "required": {
                "value": true,
                "message": "Please enter your email"
              },
              "pattern": {
                "value": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
                "message": "Please enter a valid email address"
              },
              "minLength": {
                "value": 6,
                "message": "Minimum length is 6 characters"
              },
              "maxLength": {
                "value": 100,
                "message": "Maximum length is 100 characters"
              }
            }
          }
        },
        {
            "field_is": "message",
            "name": "message",
            "label": "",
            "placeholder": "Enter your message",
            "default_value": "",
            "type": "text",
            "helper_text": "",
            "variant": "outlined",
            "error": "This field is required",
            "filters": {
              "auto_complete": false,
              "auto_focus": false,
              "required": true,
              "hideLabel": false,
              "validations": true,
              "fullWidth": true
            },
            "controller": {
              "rules": {
                "required": "Please enter your message",
                "minLength": {
                  "value": 10,
                  "message": "Minimum length is 10 characters"
                },
                "maxLength": {
                  "value": 200,
                  "message": "Maximum length is 200 characters"
                }
              }
            }
          }
          
        
      
      
  ];
  
  export default fields
  