"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
var sanity = require("sanity"), jsxRuntime = require("react/jsx-runtime"), ui = require("@sanity/ui"), react = require("react"), icons = require("@sanity/icons");
const DataFetcher = (props) => {
  const { accessToken, onSuccess, fields } = props, [vimeoId, setVimeoId] = react.useState(""), [isFetching, setIsFetching] = react.useState(!1), [errorMsg, setErrorMsg] = react.useState("");
  let vimeoFields, url = `https://api.vimeo.com/videos/${vimeoId}?fields=name,play,pictures,files`;
  return fields?.length && (vimeoFields = fields?.join(","), url += `,${vimeoFields}`), /* @__PURE__ */ jsxRuntime.jsxs(ui.Stack, { children: [
    !accessToken && /* @__PURE__ */ jsxRuntime.jsxs(ui.Inline, { space: [2], children: [
      /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { size: 2, children: "No" }),
      /* @__PURE__ */ jsxRuntime.jsx(ui.Code, { size: 2, children: "SANITY_STUDIO_VIMEO_ACCESS_TOKEN" }),
      /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { size: 2, children: "found!" })
    ] }),
    accessToken && // Fetcher
    /* @__PURE__ */ jsxRuntime.jsxs(ui.Inline, { space: [2], children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        ui.TextInput,
        {
          onChange: (event) => {
            setVimeoId(event.target.value);
          },
          value: vimeoId,
          placeholder: "Vimeo ID",
          disabled: isFetching
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(
        ui.Button,
        {
          text: "Fetch",
          onClick: async () => {
            setIsFetching(!0);
            const options = {
              method: "GET",
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            };
            try {
              const data = await (await fetch(url, options)).json();
              data?.name ? (setErrorMsg(""), data.id = vimeoId, onSuccess(data)) : data?.error && setErrorMsg(data?.error), setIsFetching(!1);
            } catch (error) {
              console.error("Error fetching data:", error), setErrorMsg("There was an error fetching data."), setIsFetching(!1);
            }
          },
          disabled: vimeoId.trim() === "" || isFetching,
          icon: icons.SyncIcon,
          tone: "primary"
        }
      ),
      isFetching && /* @__PURE__ */ jsxRuntime.jsx(ui.Spinner, { muted: !0 })
    ] }),
    errorMsg && /* @__PURE__ */ jsxRuntime.jsxs("p", { style: { color: "red" }, children: [
      "Error: ",
      errorMsg
    ] })
  ] });
}, VideoInput = (config, props) => {
  const { fields } = props?.schemaType?.options, { accessToken } = config, { onChange, value } = props, handleReset = () => {
    onChange(sanity.unset());
  }, setVimeoData = (data) => {
    onChange(data ? sanity.set(data) : sanity.unset());
  }, imgStyle = {
    width: "auto",
    height: "100px",
    borderRadius: "2px"
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(ui.Card, { children: [
    !value && /* @__PURE__ */ jsxRuntime.jsx(DataFetcher, { accessToken, onSuccess: setVimeoData, fields }),
    /* @__PURE__ */ jsxRuntime.jsx("div", { children: value?.error }),
    value?.pictures?.sizes?.length && /* @__PURE__ */ jsxRuntime.jsxs(ui.Stack, { space: 4, children: [
      /* @__PURE__ */ jsxRuntime.jsxs(ui.Stack, { space: 3, children: [
        /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { size: 1, weight: "semibold", children: "ID" }),
        /* @__PURE__ */ jsxRuntime.jsx(ui.TextInput, { fontSize: 2, padding: 3, readOnly: !0, value: value?.id })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(ui.Stack, { space: 3, children: [
        /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { size: 1, weight: "semibold", children: "Thumbnail" }),
        /* @__PURE__ */ jsxRuntime.jsx(
          "img",
          {
            src: value.pictures.sizes[0]?.link,
            width: value.pictures.sizes[0].width,
            height: value.pictures.sizes[0].height,
            alt: "Vimeo",
            style: imgStyle
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(ui.Stack, { space: 3, children: [
        /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { size: 1, weight: "semibold", children: "Title" }),
        /* @__PURE__ */ jsxRuntime.jsx(ui.TextInput, { fontSize: 2, padding: 3, readOnly: !0, value: value?.name })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(ui.Inline, { space: [2], children: /* @__PURE__ */ jsxRuntime.jsx(
        ui.Button,
        {
          text: "Reset",
          icon: icons.TrashIcon,
          mode: "ghost",
          onClick: handleReset,
          type: "reset",
          tone: "critical"
        }
      ) })
    ] })
  ] });
}, defaultConfig = {
  accessToken: ""
}, vimeoField = sanity.definePlugin((userConfig = {}) => {
  const config = { ...defaultConfig, ...userConfig };
  return {
    name: "sanity-plugin-vimeo-field",
    schema: {
      types: [
        sanity.defineType({
          title: "Vimeo Video",
          name: "vimeo",
          type: "object",
          components: {
            input: (props) => VideoInput(config, props)
          },
          fields: [
            {
              type: "object",
              name: "vimeoData",
              title: "Vimeo Data",
              readOnly: !0,
              fields: [
                {
                  title: "Vimeo ID",
                  name: "id",
                  type: "string"
                }
              ]
            }
          ]
        })
      ]
    }
  };
});
exports.vimeoField = vimeoField;
//# sourceMappingURL=index.js.map
