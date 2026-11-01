local palette = require("favo.palette")

local defaults = { transparent = false, italics = true }
local options = defaults

local function collect(colors)
  return vim.tbl_extend(
    "error",
    require("favo.editor")(colors),
    require("favo.syntax")(colors),
    require("favo.treesitter")(colors),
    require("favo.lsp")(colors),
    require("favo.plugins")(colors),
    require("favo.plugin_internals")(colors)
  )
end

local function clear_surfaces(groups, colors)
  local surfaces = { [colors.background] = true, [colors.panel] = true, [colors.float] = true }
  for name, group in pairs(groups) do
    local stays_opaque = name:find("^Pmenu") or name == "NotifyBackground"
    if surfaces[group.bg] and not stays_opaque then
      group.bg = nil
    end
  end
end

local function clear_italics(groups)
  for _, group in pairs(groups) do
    group.italic = nil
  end
end

local M = {}

function M.setup(user_options)
  options = vim.tbl_extend("force", defaults, user_options or {})
end

function M.load(variant_id)
  local colors = palette[variant_id]

  vim.g.colors_name = nil
  vim.o.background = colors.appearance
  vim.cmd.highlight("clear")
  vim.g.colors_name = "favo-" .. variant_id

  local groups = collect(colors)
  if options.transparent then
    clear_surfaces(groups, colors)
  end
  if not options.italics then
    clear_italics(groups)
  end

  for name, group in pairs(groups) do
    vim.api.nvim_set_hl(0, name, group)
  end

  for index, color in ipairs(colors.ansi) do
    vim.g["terminal_color_" .. (index - 1)] = color
  end
end

return M
