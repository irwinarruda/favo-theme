local palette = require("favo.palette")

local variant = (vim.g.colors_name or ""):match("^favo%-(%a+)$")
local c = palette[variant] or palette.honey

local function mode(color)
  return {
    a = { fg = c.background, bg = color, gui = "bold" },
    b = { fg = c.foreground, bg = c.raised },
    c = { fg = c.comment, bg = c.panel },
  }
end

return {
  normal = mode(c.accent),
  insert = mode(c.string),
  visual = mode(c.constant),
  replace = mode(c.regex),
  command = mode(c.func),
  terminal = mode(c.type),
  inactive = {
    a = { fg = c.comment, bg = c.panel },
    b = { fg = c.comment, bg = c.panel },
    c = { fg = c.comment, bg = c.panel },
  },
}
