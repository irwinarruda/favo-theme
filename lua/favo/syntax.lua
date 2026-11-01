return function(c)
  return {
    Comment = { fg = c.comment },

    Constant = { fg = c.constant },
    String = { fg = c.string },
    Character = { fg = c.string },
    Number = { fg = c.constant },
    Boolean = { fg = c.constant },
    Float = { fg = c.constant },

    Identifier = { fg = c.foreground },
    Function = { fg = c.func },

    Statement = { fg = c.keyword },
    Conditional = { fg = c.keyword },
    Repeat = { fg = c.keyword },
    Label = { fg = c.keyword },
    Operator = { fg = c.keyword },
    Keyword = { fg = c.keyword },
    Exception = { fg = c.keyword },

    PreProc = { fg = c.keyword },
    Include = { fg = c.keyword },
    Define = { fg = c.keyword },
    Macro = { fg = c.func },
    PreCondit = { fg = c.keyword },

    Type = { fg = c.type },
    StorageClass = { fg = c.keyword },
    Structure = { fg = c.keyword },
    Typedef = { fg = c.type },

    Special = { fg = c.keyword },
    SpecialChar = { fg = c.keyword },
    Tag = { fg = c.func },
    Delimiter = { fg = c.foreground },
    SpecialComment = { fg = c.keyword },
    Debug = { fg = c.keyword },

    Underlined = { fg = c.func, underline = true },
    Ignore = { fg = c.background },
    Error = { fg = c.regex, bg = c.errorBackground },
    Todo = { fg = c.func, bg = c.infoBackground, bold = true },

    Added = { fg = c.string },
    Changed = { fg = c.func },
    Removed = { fg = c.regex },
  }
end
