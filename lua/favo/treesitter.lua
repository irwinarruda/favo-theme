return function(c)
  local groups = {
    ["@variable"] = { fg = c.foreground },
    ["@variable.builtin"] = { fg = c.constant, italic = true },
    ["@variable.parameter"] = { fg = c.param, italic = true },
    ["@variable.parameter.builtin"] = { fg = c.param, italic = true },
    ["@variable.member"] = { fg = c.foreground },

    ["@constant"] = { fg = c.constant },
    ["@constant.builtin"] = { fg = c.constant },
    ["@constant.macro"] = { fg = c.constant },

    ["@module"] = { fg = c.foreground },
    ["@module.c_sharp"] = { fg = c.type },
    ["@module.builtin"] = { fg = c.constant },
    ["@label"] = { fg = c.constant, italic = true },

    ["@string"] = { fg = c.string },
    ["@string.documentation"] = { fg = c.comment },
    ["@string.regexp"] = { fg = c.regex },
    ["@string.escape"] = { fg = c.keyword },
    ["@string.special"] = { fg = c.keyword },
    ["@string.special.symbol"] = { fg = c.constant },
    ["@string.special.path"] = { fg = c.string },
    ["@string.special.url"] = { fg = c.type },

    ["@character"] = { fg = c.string },
    ["@character.special"] = { fg = c.keyword },

    ["@boolean"] = { fg = c.constant },
    ["@number"] = { fg = c.constant },
    ["@number.float"] = { fg = c.constant },

    ["@type"] = { fg = c.type },
    ["@type.builtin"] = { fg = c.type },
    ["@type.definition"] = { fg = c.type },

    ["@attribute"] = { fg = c.foreground },
    ["@attribute.builtin"] = { fg = c.foreground },
    ["@property"] = { fg = c.foreground },

    ["@function"] = { fg = c.func },
    ["@function.builtin"] = { fg = c.type },
    ["@function.call"] = { fg = c.func },
    ["@function.macro"] = { fg = c.func },
    ["@function.method"] = { fg = c.func },
    ["@function.method.call"] = { fg = c.func },

    ["@constructor"] = { fg = c.type },
    ["@constructor.lua"] = { fg = c.foreground },
    ["@operator"] = { fg = c.keyword },

    ["@keyword"] = { fg = c.keyword },
    ["@keyword.coroutine"] = { fg = c.keyword },
    ["@keyword.function"] = { fg = c.keyword },
    ["@keyword.operator"] = { fg = c.keyword },
    ["@keyword.import"] = { fg = c.keyword },
    ["@keyword.type"] = { fg = c.keyword },
    ["@keyword.modifier"] = { fg = c.keyword },
    ["@keyword.repeat"] = { fg = c.keyword },
    ["@keyword.return"] = { fg = c.keyword },
    ["@keyword.debug"] = { fg = c.keyword },
    ["@keyword.exception"] = { fg = c.keyword },
    ["@keyword.conditional"] = { fg = c.keyword },
    ["@keyword.conditional.ternary"] = { fg = c.keyword },
    ["@keyword.directive"] = { fg = c.keyword },
    ["@keyword.directive.define"] = { fg = c.keyword },

    ["@punctuation.delimiter"] = { fg = c.foreground },
    ["@punctuation.bracket"] = { fg = c.foreground },
    ["@punctuation.special"] = { fg = c.keyword },

    ["@comment"] = { fg = c.comment },
    ["@comment.documentation"] = { fg = c.comment },
    ["@comment.error"] = { fg = c.regex, bg = c.errorBackground, bold = true },
    ["@comment.warning"] = { fg = c.warning, bg = c.warningBackground, bold = true },
    ["@comment.todo"] = { fg = c.func, bg = c.infoBackground, bold = true },
    ["@comment.note"] = { fg = c.type, bg = c.hintBackground, bold = true },

    ["@markup.strong"] = { fg = c.param, bold = true },
    ["@markup.italic"] = { fg = c.string, italic = true },
    ["@markup.strikethrough"] = { strikethrough = true },
    ["@markup.underline"] = { underline = true },

    ["@markup.heading"] = { fg = c.keyword, bold = true },
    ["@markup.heading.1"] = { fg = c.keyword, bold = true },
    ["@markup.heading.2"] = { fg = c.keyword, bold = true },
    ["@markup.heading.3"] = { fg = c.keyword, bold = true },
    ["@markup.heading.4"] = { fg = c.keyword, bold = true },
    ["@markup.heading.5"] = { fg = c.keyword, bold = true },
    ["@markup.heading.6"] = { fg = c.keyword, bold = true },

    ["@markup.quote"] = { fg = c.comment },
    ["@markup.math"] = { fg = c.constant },

    ["@markup.link"] = { fg = c.foreground },
    ["@markup.link.label"] = { fg = c.foreground },
    ["@markup.link.url"] = { fg = c.type },

    ["@markup.raw"] = { fg = c.func },
    ["@markup.raw.block"] = { fg = c.func },

    ["@markup.list"] = { fg = c.keyword },
    ["@markup.list.checked"] = { fg = c.keyword },
    ["@markup.list.unchecked"] = { fg = c.keyword },

    ["@diff.plus"] = { bg = c.diffAdded },
    ["@diff.minus"] = { bg = c.diffRemoved },
    ["@diff.delta"] = { bg = c.diffChanged },

    ["@tag"] = { fg = c.keyword },
    ["@tag.builtin"] = { fg = c.keyword },
    ["@tag.attribute"] = { fg = c.func, italic = true },
    ["@tag.delimiter"] = { fg = c.foreground },
  }

  for _, language in ipairs({ "json", "jsonc", "json5", "yaml", "toml" }) do
    groups["@property." .. language] = { fg = c.type }
  end

  for _, language in ipairs({ "tsx", "javascript", "jsx" }) do
    groups["@tag." .. language] = { fg = c.type, italic = true }
  end

  for _, language in ipairs({ "tsx", "typescript", "javascript" }) do
    groups["@constructor." .. language] = { fg = c.keyword }
  end

  for _, language in ipairs({ "css", "scss", "less" }) do
    groups["@type." .. language] = { fg = c.func }
    groups["@string." .. language] = { fg = c.keyword }
    groups["@punctuation.delimiter." .. language] = { fg = c.foreground }
  end

  for _, capture in ipairs({
    "constant",
    "number",
    "operator",
    "property",
    "punctuation.bracket",
    "punctuation.delimiter",
    "string.escape",
    "variable.builtin",
  }) do
    groups["@" .. capture .. ".regex"] = { fg = c.regex }
  end

  return groups
end
