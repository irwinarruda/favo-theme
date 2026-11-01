local function telescope(c)
  return {
    TelescopeNormal = { link = "NormalFloat" },
    TelescopeBorder = { link = "FloatBorder" },
    TelescopeTitle = { link = "FloatTitle" },
    TelescopePromptNormal = { link = "NormalFloat" },
    TelescopePromptBorder = { fg = c.accent, bg = c.float },
    TelescopePromptTitle = { link = "FloatTitle" },
    TelescopePromptPrefix = { fg = c.accentText },
    TelescopePromptCounter = { fg = c.comment },
    TelescopeResultsNormal = { link = "NormalFloat" },
    TelescopeResultsBorder = { link = "FloatBorder" },
    TelescopeResultsTitle = { link = "FloatTitle" },
    TelescopePreviewNormal = { link = "NormalFloat" },
    TelescopePreviewBorder = { link = "FloatBorder" },
    TelescopePreviewTitle = { link = "FloatTitle" },
    TelescopePreviewLine = { bg = c.line },
    TelescopePreviewMatch = { bg = c.search },
    TelescopeSelection = { bg = c.selection },
    TelescopeSelectionCaret = { fg = c.accentText, bg = c.selection },
    TelescopeMultiSelection = { fg = c.accentText },
    TelescopeMultiIcon = { fg = c.accentText },
    TelescopeMatching = { fg = c.accentText, bold = true },
  }
end

local function dap_ui(c)
  local groups = {
    DapUINormal = { link = "Normal" },
    DapUIEndofBuffer = { link = "EndOfBuffer" },
    DapUIFloatNormal = { link = "NormalFloat" },
    DapUIFloatBorder = { link = "FloatBorder" },
    DapUIWinSelect = { fg = c.onFill, bg = c.fill, bold = true },
    DapUIVariable = { fg = c.foreground },
    DapUIScope = { fg = c.keyword, bold = true },
    DapUIType = { fg = c.type },
    DapUIValue = { fg = c.string },
    DapUIModifiedValue = { fg = c.func, bold = true },
    DapUIDecoration = { fg = c.faint },
    DapUIThread = { fg = c.func },
    DapUIStoppedThread = { fg = c.accentText, bold = true },
    DapUIFrameName = { fg = c.func },
    DapUICurrentFrameName = { fg = c.accentText, bold = true },
    DapUISource = { fg = c.comment },
    DapUILineNumber = { fg = c.faint },
    DapUIWatchesEmpty = { fg = c.faint },
    DapUIWatchesValue = { fg = c.string },
    DapUIWatchesError = { fg = c.regex },
    DapUIBreakpointsPath = { link = "Directory" },
    DapUIBreakpointsInfo = { fg = c.func },
    DapUIBreakpointsLine = { fg = c.faint },
    DapUIBreakpointsCurrentLine = { fg = c.accentText, bold = true },
    DapUIBreakpointsDisabledLine = { fg = c.faint },
    DapUIUnavailable = { fg = c.faint },
    DapUIUnavailableNC = { fg = c.faint },
  }

  local controls = {
    PlayPause = c.string,
    Restart = c.string,
    Stop = c.regex,
    StepOver = c.func,
    StepInto = c.func,
    StepBack = c.func,
    StepOut = c.func,
  }

  for control, color in pairs(controls) do
    groups["DapUI" .. control] = { fg = color }
    groups["DapUI" .. control .. "NC"] = { fg = color }
  end

  return groups
end

local function mason(c)
  return {
    MasonNormal = { link = "NormalFloat" },
    MasonHeader = { fg = c.onFill, bg = c.fill, bold = true },
    MasonHeaderSecondary = { fg = c.foreground, bg = c.raised, bold = true },
    MasonHeading = { fg = c.keyword, bold = true },
    MasonHighlight = { fg = c.accentText },
    MasonHighlightBlock = { fg = c.onFill, bg = c.fill },
    MasonHighlightBlockBold = { fg = c.onFill, bg = c.fill, bold = true },
    MasonHighlightSecondary = { fg = c.comment },
    MasonHighlightBlockSecondary = { fg = c.foreground, bg = c.raised },
    MasonHighlightBlockBoldSecondary = { fg = c.foreground, bg = c.raised, bold = true },
    MasonLink = { fg = c.type },
    MasonMuted = { fg = c.comment },
    MasonMutedBlock = { fg = c.comment, bg = c.raised },
    MasonMutedBlockBold = { fg = c.comment, bg = c.raised, bold = true },
    MasonError = { fg = c.regex },
    MasonWarning = { fg = c.warning },
  }
end

return function(c)
  return vim.tbl_extend("error", telescope(c), dap_ui(c), mason(c))
end
