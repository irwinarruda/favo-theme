local function kinds(c)
  return {
    Class = c.type,
    Color = c.constant,
    Constant = c.constant,
    Constructor = c.keyword,
    Enum = c.type,
    EnumMember = c.constant,
    Event = c.foreground,
    Field = c.foreground,
    File = c.foreground,
    Folder = c.accentText,
    Function = c.func,
    Interface = c.type,
    Keyword = c.keyword,
    Method = c.func,
    Module = c.foreground,
    Operator = c.keyword,
    Property = c.foreground,
    Reference = c.foreground,
    Snippet = c.string,
    Struct = c.type,
    Text = c.foreground,
    TypeParameter = c.type,
    Unit = c.constant,
    Value = c.constant,
    Variable = c.foreground,
  }
end

local function gitsigns(c)
  local groups = {
    GitSignsAddPreview = { bg = c.diffAdded },
    GitSignsDeletePreview = { bg = c.diffRemoved },
    GitSignsNoEOLPreview = { fg = c.faint },
    GitSignsCurrentLineBlame = { fg = c.comment },
    GitSignsDiffStaged = { fg = c.faint },
    GitSignsDeleteVirtLn = { bg = c.diffRemoved },
    GitSignsVirtLnum = { fg = c.faint, bg = c.diffRemoved },
    GitSignsDeleteVirtLnInLine = { bg = c.diffText },
  }

  for _, kind in ipairs({ "Add", "Change", "Delete" }) do
    groups["GitSigns" .. kind .. "Inline"] = { bg = c.diffText }
    groups["GitSigns" .. kind .. "LnInline"] = { bg = c.diffText }
    groups["GitSigns" .. kind .. "VirtLnInline"] = { bg = c.diffText }
  end

  local signs = {
    Add = { text = c.string, line = c.diffAdded },
    Change = { text = c.func, line = c.diffChanged },
    Changedelete = { text = c.func, line = c.diffChanged },
    Delete = { text = c.regex },
    Topdelete = { text = c.regex },
    Untracked = { text = c.string, line = c.diffAdded },
  }

  for kind, sign in pairs(signs) do
    for _, place in ipairs({ "", "Nr", "Cul" }) do
      groups["GitSigns" .. kind .. place] = { fg = sign.text }
      groups["GitSignsStaged" .. kind .. place] = { fg = c.faint }
    end
    if sign.line then
      groups["GitSigns" .. kind .. "Ln"] = { bg = sign.line }
      groups["GitSignsStaged" .. kind .. "Ln"] = { bg = c.raised }
    end
  end

  return groups
end

local function telescope(c)
  return {
    TelescopeResultsNumber = { fg = c.faint },
    TelescopeResultsComment = { fg = c.comment },
  }
end

local function cmp(c)
  local groups = {
    CmpItemAbbr = { fg = c.foreground },
    CmpItemAbbrDeprecated = { fg = c.comment, strikethrough = true },
    CmpItemAbbrMatch = { fg = c.accentText, bold = true },
    CmpItemAbbrMatchFuzzy = { fg = c.accentText, bold = true },
    CmpItemKind = { fg = c.type },
    CmpItemKindIcon = { fg = c.type },
    CmpItemMenu = { fg = c.comment },
  }

  for kind, color in pairs(kinds(c)) do
    groups["CmpItemKind" .. kind] = { fg = color }
    groups["CmpItemKind" .. kind .. "Icon"] = { fg = color }
  end

  return groups
end

local function blink(c)
  local groups = {
    BlinkCmpMenu = { link = "Pmenu" },
    BlinkCmpMenuBorder = { link = "PmenuBorder" },
    BlinkCmpMenuSelection = { link = "PmenuSel" },
    BlinkCmpScrollBarThumb = { link = "PmenuThumb" },
    BlinkCmpScrollBarGutter = { link = "PmenuSbar" },
    BlinkCmpLabel = { fg = c.foreground },
    BlinkCmpLabelDeprecated = { fg = c.comment, strikethrough = true },
    BlinkCmpLabelMatch = { link = "PmenuMatch" },
    BlinkCmpLabelDetail = { fg = c.comment },
    BlinkCmpLabelDescription = { fg = c.comment },
    BlinkCmpKind = { fg = c.type },
    BlinkCmpSource = { fg = c.comment },
    BlinkCmpGhostText = { link = "ComplHint" },
    BlinkCmpDoc = { link = "NormalFloat" },
    BlinkCmpDocBorder = { link = "FloatBorder" },
    BlinkCmpDocSeparator = { link = "FloatBorder" },
    BlinkCmpDocCursorLine = { link = "PmenuSel" },
    BlinkCmpSignatureHelp = { link = "NormalFloat" },
    BlinkCmpSignatureHelpBorder = { link = "FloatBorder" },
    BlinkCmpSignatureHelpActiveParameter = { link = "LspSignatureActiveParameter" },
  }

  for kind, color in pairs(kinds(c)) do
    groups["BlinkCmpKind" .. kind] = { fg = color }
  end

  return groups
end

local function which_key(c)
  return {
    WhichKey = { fg = c.func },
    WhichKeyBorder = { link = "FloatBorder" },
    WhichKeyDesc = { fg = c.foreground },
    WhichKeyGroup = { fg = c.keyword },
    WhichKeyIcon = { fg = c.func },
    WhichKeyIconAzure = { fg = c.func },
    WhichKeyIconBlue = { fg = c.func },
    WhichKeyIconCyan = { fg = c.type },
    WhichKeyIconGreen = { fg = c.string },
    WhichKeyIconGrey = { fg = c.comment },
    WhichKeyIconOrange = { fg = c.keyword },
    WhichKeyIconPurple = { fg = c.constant },
    WhichKeyIconRed = { fg = c.regex },
    WhichKeyIconYellow = { fg = c.warning },
    WhichKeyNormal = { link = "NormalFloat" },
    WhichKeySeparator = { fg = c.comment },
    WhichKeyTitle = { link = "FloatTitle" },
    WhichKeyValue = { fg = c.comment },
  }
end

local function noice(c)
  local groups = {
    NoiceCmdline = { link = "MsgArea" },
    NoiceCmdlineIcon = { fg = c.accentText },
    NoiceCmdlinePopup = { link = "NormalFloat" },
    NoiceCmdlinePopupBorder = { fg = c.accent, bg = c.float },
    NoiceCmdlinePopupTitle = { link = "FloatTitle" },
    NoiceCmdlinePrompt = { fg = c.accentText, bold = true },
    NoiceCompletionItemKindDefault = { fg = c.comment },
    NoiceCompletionItemMenu = { fg = c.comment },
    NoiceCompletionItemWord = { fg = c.foreground },
    NoiceConfirm = { link = "NormalFloat" },
    NoiceConfirmBorder = { link = "FloatBorder" },
    NoiceCursor = { link = "Cursor" },
    NoiceFormatConfirm = { fg = c.foreground, bg = c.raised },
    NoiceFormatConfirmDefault = { fg = c.onFill, bg = c.fill, bold = true },
    NoiceFormatDate = { fg = c.comment },
    NoiceFormatEvent = { fg = c.comment },
    NoiceFormatKind = { fg = c.comment },
    NoiceFormatLevelDebug = { fg = c.comment },
    NoiceFormatLevelError = { link = "DiagnosticVirtualTextError" },
    NoiceFormatLevelInfo = { link = "DiagnosticVirtualTextInfo" },
    NoiceFormatLevelOff = { fg = c.faint },
    NoiceFormatLevelTrace = { fg = c.faint },
    NoiceFormatLevelWarn = { link = "DiagnosticVirtualTextWarn" },
    NoiceFormatProgressDone = { fg = c.onFill, bg = c.fill },
    NoiceFormatProgressTodo = { fg = c.foreground, bg = c.raised },
    NoiceFormatTitle = { link = "Title" },
    NoiceLspProgressClient = { link = "Title" },
    NoiceLspProgressSpinner = { fg = c.accentText },
    NoiceLspProgressTitle = { fg = c.comment },
    NoiceMini = { link = "MsgArea" },
    NoicePopup = { link = "NormalFloat" },
    NoicePopupBorder = { link = "FloatBorder" },
    NoicePopupmenu = { link = "Pmenu" },
    NoicePopupmenuBorder = { link = "PmenuBorder" },
    NoicePopupmenuMatch = { link = "PmenuMatch" },
    NoicePopupmenuSelected = { link = "PmenuSel" },
    NoiceScrollbar = { link = "PmenuSbar" },
    NoiceScrollbarThumb = { link = "PmenuThumb" },
    NoiceSplit = { link = "NormalFloat" },
    NoiceSplitBorder = { link = "FloatBorder" },
    NoiceVirtualText = { link = "DiagnosticVirtualTextInfo" },
  }

  for _, mode in ipairs({ "Calculator", "Cmdline", "Filter", "Help", "IncRename", "Input", "Lua", "Search" }) do
    groups["NoiceCmdlineIcon" .. mode] = { link = "NoiceCmdlineIcon" }
    groups["NoiceCmdlinePopupBorder" .. mode] = { link = "NoiceCmdlinePopupBorder" }
  end

  for kind, color in pairs(kinds(c)) do
    groups["NoiceCompletionItemKind" .. kind] = { fg = color }
  end

  return groups
end

local function notify(c)
  local groups = { NotifyBackground = { bg = c.float } }
  local levels = { ERROR = c.regex, WARN = c.warning, INFO = c.func, DEBUG = c.type, TRACE = c.comment }

  for level, color in pairs(levels) do
    groups["Notify" .. level .. "Border"] = { fg = color, bg = c.float }
    groups["Notify" .. level .. "Icon"] = { fg = color }
    groups["Notify" .. level .. "Title"] = { fg = color }
    groups["Notify" .. level .. "Body"] = { link = "NormalFloat" }
  end

  return groups
end

local function indent_blankline(c)
  return {
    IblIndent = { fg = c.border },
    IblWhitespace = { fg = c.border },
    IblScope = { fg = c.accent },
  }
end

local function rainbow_delimiters(c)
  return {
    RainbowDelimiterRed = { fg = c.keyword },
    RainbowDelimiterYellow = { fg = c.param },
    RainbowDelimiterBlue = { fg = c.func },
    RainbowDelimiterOrange = { fg = c.type },
    RainbowDelimiterGreen = { fg = c.constant },
    RainbowDelimiterViolet = { fg = c.keyword },
    RainbowDelimiterCyan = { fg = c.param },
  }
end

local function neo_tree(c)
  return {
    NeoTreeNormal = { fg = c.foreground, bg = c.panel },
    NeoTreeNormalNC = { fg = c.foreground, bg = c.panel },
    NeoTreeSignColumn = { fg = c.faint, bg = c.panel },
    NeoTreeEndOfBuffer = { fg = c.faint, bg = c.panel },
    NeoTreeStatusLine = { fg = c.foreground, bg = c.panel },
    NeoTreeStatusLineNC = { fg = c.comment, bg = c.panel },
    NeoTreeWinSeparator = { link = "WinSeparator" },
    NeoTreeVertSplit = { link = "WinSeparator" },
    NeoTreeCursorLine = { bg = c.raised },
    NeoTreeBufferNumber = { fg = c.faint },
    NeoTreeDimText = { fg = c.faint },
    NeoTreeDotfile = { fg = c.faint },
    NeoTreeHiddenByName = { fg = c.faint },
    NeoTreeIgnored = { fg = c.faint },
    NeoTreeWindowsHidden = { fg = c.faint },
    NeoTreeExpander = { fg = c.faint },
    NeoTreeIndentMarker = { fg = c.border },
    NeoTreeDirectoryIcon = { link = "Directory" },
    NeoTreeDirectoryName = { link = "Directory" },
    NeoTreeRootName = { fg = c.accentText, bold = true },
    NeoTreeFileIcon = { fg = c.comment },
    NeoTreeFileName = { fg = c.foreground },
    NeoTreeFileNameOpened = { fg = c.foreground, bold = true },
    NeoTreeFilterTerm = { fg = c.accentText, bold = true },
    NeoTreeSymbolicLinkTarget = { fg = c.type },
    NeoTreeModified = { fg = c.func },
    NeoTreeStats = { fg = c.comment },
    NeoTreeStatsHeader = { fg = c.comment, bold = true },
    NeoTreeFloatBorder = { link = "FloatBorder" },
    NeoTreeFloatTitle = { link = "FloatTitle" },
    NeoTreeTitleBar = { fg = c.background, bg = c.accent, bold = true },
    NeoTreeGitAdded = { fg = c.string },
    NeoTreeGitConflict = { fg = c.regex, bold = true },
    NeoTreeGitDeleted = { fg = c.regex },
    NeoTreeGitIgnored = { fg = c.faint },
    NeoTreeGitModified = { fg = c.func },
    NeoTreeGitStaged = { fg = c.string },
    NeoTreeGitUnstaged = { fg = c.func },
    NeoTreeGitUntracked = { fg = c.string },
    NeoTreeTabActive = { fg = c.background, bg = c.accent, bold = true },
    NeoTreeTabInactive = { fg = c.comment, bg = c.panel },
    NeoTreeTabSeparatorActive = { fg = c.accent, bg = c.panel },
    NeoTreeTabSeparatorInactive = { fg = c.border, bg = c.panel },
  }
end

local function nvim_tree(c)
  local groups = {
    NvimTreeNormal = { fg = c.foreground, bg = c.panel },
    NvimTreeNormalNC = { link = "NvimTreeNormal" },
    NvimTreeNormalFloat = { link = "NormalFloat" },
    NvimTreePopup = { link = "NormalFloat" },
    NvimTreeSignColumn = { fg = c.faint, bg = c.panel },
    NvimTreeEndOfBuffer = { fg = c.faint, bg = c.panel },
    NvimTreeLineNr = { fg = c.faint, bg = c.panel },
    NvimTreeWinSeparator = { link = "WinSeparator" },
    NvimTreeCursorColumn = { bg = c.raised },
    NvimTreeCursorLine = { bg = c.raised },
    NvimTreeCursorLineNr = { link = "CursorLineNr" },
    NvimTreeStatusLine = { link = "StatusLine" },
    NvimTreeStatusLineNC = { link = "StatusLineNC" },

    NvimTreeExecFile = { fg = c.func },
    NvimTreeImageFile = { fg = c.foreground },
    NvimTreeSpecialFile = { fg = c.accentText },
    NvimTreeSymlink = { fg = c.type },

    NvimTreeRootFolder = { fg = c.accentText, bold = true },
    NvimTreeFolderName = { link = "Directory" },
    NvimTreeEmptyFolderName = { link = "Directory" },
    NvimTreeOpenedFolderName = { fg = c.accentText, bold = true },
    NvimTreeSymlinkFolderName = { fg = c.type },

    NvimTreeFileIcon = { fg = c.comment },
    NvimTreeSymlinkIcon = { fg = c.type },
    NvimTreeFolderIcon = { link = "Directory" },
    NvimTreeOpenedFolderIcon = { link = "Directory" },
    NvimTreeClosedFolderIcon = { link = "Directory" },
    NvimTreeFolderArrowClosed = { fg = c.faint },
    NvimTreeFolderArrowOpen = { fg = c.faint },
    NvimTreeIndentMarker = { fg = c.border },

    NvimTreeWindowPicker = { fg = c.onFill, bg = c.fill, bold = true },
    NvimTreeLiveFilterPrefix = { fg = c.accentText, bold = true },
    NvimTreeLiveFilterValue = { fg = c.foreground, bold = true },
    NvimTreeCopiedHL = { bg = c.reference },
    NvimTreeCutHL = { bg = c.diffRemoved },
    NvimTreeBookmarkIcon = { fg = c.constant },
    NvimTreeBookmarkHL = { fg = c.constant },
    NvimTreeModifiedIcon = { fg = c.func },
    NvimTreeModifiedFileHL = { fg = c.func },
    NvimTreeModifiedFolderHL = { fg = c.func },
    NvimTreeHiddenIcon = { fg = c.faint },
    NvimTreeHiddenFileHL = { fg = c.faint },
    NvimTreeHiddenDisplay = { fg = c.faint },
    NvimTreeOpenedHL = { fg = c.foreground, bold = true },
  }

  local git = {
    Deleted = c.regex,
    Dirty = c.func,
    Ignored = c.faint,
    Merge = c.warning,
    New = c.string,
    Renamed = c.func,
    Staged = c.string,
  }

  for state, color in pairs(git) do
    groups["NvimTreeGit" .. state .. "Icon"] = { fg = color }
    groups["NvimTreeGitFile" .. state .. "HL"] = { fg = color }
    groups["NvimTreeGitFolder" .. state .. "HL"] = { fg = color }
  end

  local diagnostics = { Error = c.regex, Warn = c.warning, Info = c.func, Hint = c.type }

  for severity, color in pairs(diagnostics) do
    groups["NvimTreeDiagnostic" .. severity .. "Icon"] = { fg = color }
    groups["NvimTreeDiagnostic" .. severity .. "FileHL"] = { undercurl = true, sp = color }
    groups["NvimTreeDiagnostic" .. severity .. "FolderHL"] = { undercurl = true, sp = color }
  end

  return groups
end

local function trouble(c)
  local groups = {
    TroubleNormal = { fg = c.foreground, bg = c.panel },
    TroubleNormalNC = { link = "TroubleNormal" },
    TroubleBasename = { fg = c.foreground },
    TroubleFilename = { fg = c.foreground },
    TroubleDirectory = { link = "Directory" },
    TroubleCode = { fg = c.comment },
    TroubleCount = { fg = c.accentText, bold = true },
    TroubleIndent = { fg = c.border },
    TroubleIndentFoldClosed = { fg = c.accentText },
    TroubleIndentFoldOpen = { fg = c.border },
    TroubleIndentLast = { fg = c.border },
    TroubleIndentMiddle = { fg = c.border },
    TroubleIndentTop = { fg = c.border },
    TroubleIndentWs = { fg = c.border },
    TroublePos = { fg = c.faint },
    TroublePreview = { link = "Visual" },
    TroubleSource = { fg = c.comment },
    TroubleText = { fg = c.foreground },
  }

  local icons = vim.tbl_extend("force", kinds(c), {
    Array = c.foreground,
    Boolean = c.constant,
    Directory = c.accentText,
    Key = c.type,
    Namespace = c.foreground,
    Null = c.constant,
    Number = c.constant,
    Object = c.foreground,
    Package = c.foreground,
    String = c.string,
  })

  for kind, color in pairs(icons) do
    groups["TroubleIcon" .. kind] = { fg = color }
  end

  return groups
end

local function dap(c)
  return {
    DapBreakpoint = { fg = c.regex },
    DapBreakpointCondition = { fg = c.warning },
    DapBreakpointRejected = { fg = c.faint },
    DapLogPoint = { fg = c.func },
    DapStopped = { fg = c.accentText },
  }
end

local function lazy(c)
  return {
    LazyNormal = { link = "NormalFloat" },
    LazyH1 = { fg = c.onFill, bg = c.fill, bold = true },
    LazyH2 = { fg = c.keyword, bold = true },
    LazyBold = { bold = true },
    LazyItalic = { italic = true },
    LazyButton = { fg = c.foreground, bg = c.raised },
    LazyButtonActive = { fg = c.onFill, bg = c.fill, bold = true },
    LazyComment = { fg = c.comment },
    LazyCommit = { fg = c.constant },
    LazyCommitIssue = { fg = c.func },
    LazyCommitScope = { fg = c.comment, italic = true },
    LazyCommitType = { fg = c.keyword },
    LazyDimmed = { fg = c.faint },
    LazyDir = { fg = c.type },
    LazyError = { link = "DiagnosticError" },
    LazyInfo = { link = "DiagnosticInfo" },
    LazyWarning = { link = "DiagnosticWarn" },
    LazyLocal = { fg = c.constant },
    LazyNoCond = { fg = c.warning },
    LazyProgressDone = { fg = c.accent },
    LazyProgressTodo = { fg = c.border },
    LazyProp = { fg = c.comment },
    LazyReasonCmd = { fg = c.keyword },
    LazyReasonEvent = { fg = c.constant },
    LazyReasonFt = { fg = c.string },
    LazyReasonImport = { fg = c.foreground },
    LazyReasonKeys = { fg = c.keyword },
    LazyReasonPlugin = { fg = c.func },
    LazyReasonRequire = { fg = c.param },
    LazyReasonRuntime = { fg = c.func },
    LazyReasonSource = { fg = c.string },
    LazyReasonStart = { fg = c.type },
    LazySpecial = { fg = c.keyword },
    LazyTaskOutput = { fg = c.foreground },
    LazyUrl = { fg = c.type },
    LazyValue = { fg = c.string },
  }
end

local function fzf_lua(c)
  return {
    FzfLuaNormal = { link = "NormalFloat" },
    FzfLuaBorder = { link = "FloatBorder" },
    FzfLuaTitle = { link = "FloatTitle" },
    FzfLuaTitleFlags = { fg = c.comment, bg = c.float },
    FzfLuaBackdrop = { link = "FloatShadow" },
    FzfLuaPreviewNormal = { link = "NormalFloat" },
    FzfLuaPreviewBorder = { link = "FloatBorder" },
    FzfLuaPreviewTitle = { link = "FloatTitle" },
    FzfLuaCursor = { link = "Cursor" },
    FzfLuaCursorLine = { link = "CursorLine" },
    FzfLuaCursorLineNr = { link = "CursorLineNr" },
    FzfLuaSearch = { link = "IncSearch" },
    FzfLuaScrollBorderEmpty = { fg = c.border, bg = c.float },
    FzfLuaScrollBorderFull = { fg = c.accent, bg = c.float },
    FzfLuaScrollFloatEmpty = { link = "PmenuSbar" },
    FzfLuaScrollFloatFull = { link = "PmenuThumb" },
    FzfLuaHelpNormal = { link = "NormalFloat" },
    FzfLuaHelpBorder = { link = "FloatBorder" },
    FzfLuaHeaderBind = { fg = c.keyword },
    FzfLuaHeaderText = { fg = c.comment },
    FzfLuaPathColNr = { fg = c.faint },
    FzfLuaPathLineNr = { fg = c.faint },
    FzfLuaBufName = { link = "Directory" },
    FzfLuaBufId = { fg = c.comment },
    FzfLuaBufNr = { fg = c.constant },
    FzfLuaBufLineNr = { link = "LineNr" },
    FzfLuaBufFlagCur = { fg = c.accentText },
    FzfLuaBufFlagAlt = { fg = c.comment },
    FzfLuaTabTitle = { fg = c.accentText, bold = true },
    FzfLuaTabMarker = { fg = c.keyword },
    FzfLuaDirIcon = { link = "Directory" },
    FzfLuaDirPart = { fg = c.comment },
    FzfLuaFilePart = { fg = c.foreground },
    FzfLuaLivePrompt = { fg = c.accentText },
    FzfLuaLiveSym = { fg = c.accentText },
    FzfLuaCmdEx = { fg = c.keyword },
    FzfLuaCmdBuf = { fg = c.string },
    FzfLuaCmdGlobal = { fg = c.func },
    FzfLuaFzfNormal = { link = "NormalFloat" },
    FzfLuaFzfCursorLine = { link = "PmenuSel" },
    FzfLuaFzfMatch = { fg = c.accentText, bold = true },
    FzfLuaFzfBorder = { link = "FloatBorder" },
    FzfLuaFzfScrollbar = { link = "FloatBorder" },
    FzfLuaFzfSeparator = { link = "FloatBorder" },
    FzfLuaFzfGutter = { link = "NormalFloat" },
    FzfLuaFzfHeader = { fg = c.comment },
    FzfLuaFzfInfo = { fg = c.faint },
    FzfLuaFzfPointer = { fg = c.accent },
    FzfLuaFzfMarker = { fg = c.accentText },
    FzfLuaFzfSpinner = { fg = c.accent },
    FzfLuaFzfPrompt = { fg = c.accentText },
    FzfLuaFzfQuery = { fg = c.foreground },
  }
end

return function(c)
  return vim.tbl_extend(
    "error",
    gitsigns(c),
    telescope(c),
    cmp(c),
    blink(c),
    which_key(c),
    noice(c),
    notify(c),
    indent_blankline(c),
    rainbow_delimiters(c),
    neo_tree(c),
    nvim_tree(c),
    trouble(c),
    dap(c),
    lazy(c),
    fzf_lua(c)
  )
end
