return function(c)
  local groups = {
    ["@lsp.type.class"] = { fg = c.type },
    ["@lsp.type.comment"] = {},
    ["@lsp.type.decorator"] = { fg = c.func },
    ["@lsp.type.enum"] = { fg = c.type },
    ["@lsp.type.enumMember"] = { fg = c.constant },
    ["@lsp.type.event"] = { fg = c.type },
    ["@lsp.type.function"] = { fg = c.func },
    ["@lsp.type.interface"] = { fg = c.type },
    ["@lsp.type.keyword"] = { fg = c.keyword },
    ["@lsp.type.macro"] = { fg = c.type },
    ["@lsp.type.method"] = { fg = c.func },
    ["@lsp.type.modifier"] = { fg = c.type },
    ["@lsp.type.namespace"] = { fg = c.type },
    ["@lsp.type.number"] = { fg = c.constant },
    ["@lsp.type.operator"] = { fg = c.keyword },
    ["@lsp.type.parameter"] = { fg = c.param, italic = true },
    ["@lsp.type.property"] = { fg = c.foreground },
    ["@lsp.type.regexp"] = { fg = c.regex },
    ["@lsp.type.string"] = {},
    ["@lsp.type.struct"] = { fg = c.type },
    ["@lsp.type.type"] = { fg = c.type },
    ["@lsp.type.typeParameter"] = { fg = c.type, italic = true },
    ["@lsp.type.variable"] = {},
    ["@lsp.type.constantName.cs"] = { fg = c.constant },
    ["@lsp.type.extensionMethodName.cs"] = { fg = c.func },

    ["@lsp.mod.defaultLibrary"] = { fg = c.constant },
    ["@lsp.mod.deprecated"] = { strikethrough = true },
    ["@lsp.mod.global"] = { fg = c.constant },

    ["@lsp.typemod.class.defaultLibrary"] = { fg = c.type },
    ["@lsp.typemod.function.defaultLibrary"] = { fg = c.type },
    ["@lsp.typemod.function.defaultLibrary.lua"] = { fg = c.func },
    ["@lsp.typemod.interface.defaultLibrary"] = { fg = c.type },
    ["@lsp.typemod.method.defaultLibrary"] = { fg = c.func },
    ["@lsp.typemod.type.defaultLibrary"] = { fg = c.type },
    ["@lsp.typemod.typeParameter.declaration"] = { fg = c.type, italic = true },
    ["@lsp.typemod.variable.readonly"] = { fg = c.constant },
    ["@lsp.typemod.variable.defaultLibrary"] = { fg = c.constant },

    LspReferenceText = { bg = c.reference },
    LspReferenceRead = { bg = c.reference },
    LspReferenceWrite = { bg = c.referenceWrite },
    LspReferenceTarget = { bg = c.reference },
    LspInlayHint = { fg = c.comment, bg = c.raised },
    LspCodeLens = { fg = c.faint },
    LspCodeLensSeparator = { fg = c.border },
    LspSignatureActiveParameter = { fg = c.param, italic = true, bold = true },

    DiagnosticDeprecated = { strikethrough = true },
    DiagnosticUnnecessary = { fg = c.faint },
  }

  for _, language in ipairs({ "json", "jsonc", "json5", "yaml", "toml" }) do
    groups["@lsp.type.property." .. language] = { fg = c.type }
  end

  local signals = {
    Error = { text = c.regex, tint = c.errorBackground },
    Warn = { text = c.warning, tint = c.warningBackground },
    Info = { text = c.func, tint = c.infoBackground },
    Hint = { text = c.type, tint = c.hintBackground },
    Ok = { text = c.string, tint = c.diffAdded },
  }

  for name, signal in pairs(signals) do
    groups["Diagnostic" .. name] = { fg = signal.text }
    groups["DiagnosticFloating" .. name] = { fg = signal.text }
    groups["DiagnosticSign" .. name] = { fg = signal.text }
    groups["DiagnosticUnderline" .. name] = { undercurl = true, sp = signal.text }
    groups["DiagnosticVirtualLines" .. name] = { fg = signal.text, bg = signal.tint }
    groups["DiagnosticVirtualText" .. name] = { fg = signal.text, bg = signal.tint }
  end

  return groups
end
