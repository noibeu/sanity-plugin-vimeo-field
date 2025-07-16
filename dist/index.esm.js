import { set, unset, definePlugin, defineType } from "sanity";
import { jsxs, jsx } from "react/jsx-runtime";
import { Stack, Inline, Text, Code, TextInput, Button, Spinner, Card } from "@sanity/ui";
import { useState } from "react";
import { SyncIcon, TrashIcon } from "@sanity/icons";
const DataFetcher = (props) => {
  const { accessToken, onSuccess, fields } = props, [vimeoId, setVimeoId] = useState(""), [isFetching, setIsFetching] = useState(!1), [errorMsg, setErrorMsg] = useState("");
  let vimeoFields, url = `https://api.vimeo.com/videos/${vimeoId}?fields=name,play,pictures,files`;
  return fields?.length && (vimeoFields = fields?.join(","), url += `,${vimeoFields}`), /* @__PURE__ */ jsxs(Stack, { children: [
    !accessToken && /* @__PURE__ */ jsxs(Inline, { space: [2], children: [
      /* @__PURE__ */ jsx(Text, { size: 2, children: "No" }),
      /* @__PURE__ */ jsx(Code, { size: 2, children: "SANITY_STUDIO_VIMEO_ACCESS_TOKEN" }),
      /* @__PURE__ */ jsx(Text, { size: 2, children: "found!" })
    ] }),
    accessToken && // Fetcher
    /* @__PURE__ */ jsxs(Inline, { space: [2], children: [
      /* @__PURE__ */ jsx(
        TextInput,
        {
          onChange: (event) => {
            setVimeoId(event.target.value);
          },
          value: vimeoId,
          placeholder: "Vimeo ID",
          disabled: isFetching
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
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
          icon: SyncIcon,
          tone: "primary"
        }
      ),
      isFetching && /* @__PURE__ */ jsx(Spinner, { muted: !0 })
    ] }),
    errorMsg && /* @__PURE__ */ jsxs("p", { style: { color: "red" }, children: [
      "Error: ",
      errorMsg
    ] })
  ] });
}, VideoInput = (config, props) => {
  const { fields } = props?.schemaType?.options, { accessToken } = config, { onChange, value } = props, handleReset = () => {
    onChange(unset());
  }, setVimeoData = (data) => {
    onChange(data ? set(data) : unset());
  }, imgStyle = {
    width: "auto",
    height: "100px",
    borderRadius: "2px"
  };
  return /* @__PURE__ */ jsxs(Card, { children: [
    !value && /* @__PURE__ */ jsx(DataFetcher, { accessToken, onSuccess: setVimeoData, fields }),
    /* @__PURE__ */ jsx("div", { children: value?.error }),
    value?.pictures?.sizes?.length && /* @__PURE__ */ jsxs(Stack, { space: 4, children: [
      /* @__PURE__ */ jsxs(Stack, { space: 3, children: [
        /* @__PURE__ */ jsx(Text, { size: 1, weight: "semibold", children: "ID" }),
        /* @__PURE__ */ jsx(TextInput, { fontSize: 2, padding: 3, readOnly: !0, value: value?.id })
      ] }),
      /* @__PURE__ */ jsxs(Stack, { space: 3, children: [
        /* @__PURE__ */ jsx(Text, { size: 1, weight: "semibold", children: "Thumbnail" }),
        /* @__PURE__ */ jsx(
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
      /* @__PURE__ */ jsxs(Stack, { space: 3, children: [
        /* @__PURE__ */ jsx(Text, { size: 1, weight: "semibold", children: "Title" }),
        /* @__PURE__ */ jsx(TextInput, { fontSize: 2, padding: 3, readOnly: !0, value: value?.name })
      ] }),
      /* @__PURE__ */ jsx(Inline, { space: [2], children: /* @__PURE__ */ jsx(
        Button,
        {
          text: "Reset",
          icon: TrashIcon,
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
}, vimeoField = definePlugin((userConfig = {}) => {
  const config = { ...defaultConfig, ...userConfig };
  return {
    name: "sanity-plugin-vimeo-field",
    schema: {
      types: [
        defineType({
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
export {
  vimeoField
};
//# sourceMappingURL=index.esm.js.map
