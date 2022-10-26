# v0.10.0 (Wed Oct 26 2022)

#### 🚀 Enhancement

- Add rule for using the Player CLI to compile XLRs [#21](https://github.com/player-ui/rules_player/pull/21) ([@KetanReddy](https://github.com/KetanReddy))

#### Authors: 1

- Ketan Reddy ([@KetanReddy](https://github.com/KetanReddy))

---

# v0.9.0 (Mon Oct 17 2022)

#### 🚀 Enhancement

- [js_pipeline] add rollup image plugin [#22](https://github.com/player-ui/rules_player/pull/22) ([@sugarmanz](https://github.com/sugarmanz))

#### Authors: 1

- Jeremiah Zucker ([@sugarmanz](https://github.com/sugarmanz))

---

# v0.8.0 (Thu Aug 18 2022)

#### 🚀 Enhancement

- update swift rules to work with xcode 13.3+ [#20](https://github.com/player-ui/rules_player/pull/20) ([@hborawski](https://github.com/hborawski))

#### Authors: 1

- Harris Borawski ([@hborawski](https://github.com/hborawski))

---

# v0.7.0 (Mon Aug 08 2022)

#### 🚀 Enhancement

- Update gh_pages and enable tarball stamping [#19](https://github.com/player-ui/rules_player/pull/19) ([@adierkens](https://github.com/adierkens))

#### Authors: 1

- Adam Dierkens ([@adierkens](https://github.com/adierkens))

---

# v0.6.4 (Wed Aug 03 2022)

#### 🐛 Bug Fix

- Don't include v in strip_prefix [#18](https://github.com/player-ui/rules_player/pull/18) ([@adierkens](https://github.com/adierkens))

#### ⚠️ Pushed to `main`

- Add syntax highlight ([@adierkens](https://github.com/adierkens))

#### Authors: 1

- Adam Dierkens ([@adierkens](https://github.com/adierkens))

---

# v0.6.3 (Wed Aug 03 2022)

#### ⚠️ Pushed to `main`

- Update .autorc ([@adierkens](https://github.com/adierkens))

#### Authors: 1

- Adam Dierkens ([@adierkens](https://github.com/adierkens))

---

# v0.6.2 (Wed Aug 03 2022)

#### 🐛 Bug Fix

- Add auto plugin to add usage notes to release [#17](https://github.com/player-ui/rules_player/pull/17) ([@adierkens](https://github.com/adierkens))

#### Authors: 1

- Adam Dierkens ([@adierkens](https://github.com/adierkens))

---

# v0.6.1 (Mon Aug 01 2022)

#### 🐛 Bug Fix

- Fix non-utf8 files from being changed during nextjs stamping [#16](https://github.com/player-ui/rules_player/pull/16) ([@adierkens](https://github.com/adierkens))

#### 📝 Documentation

- Add build badge to README [#15](https://github.com/player-ui/rules_player/pull/15) ([@adierkens](https://github.com/adierkens))

#### Authors: 1

- Adam Dierkens ([@adierkens](https://github.com/adierkens))

---

# v0.6.0 (Mon Aug 01 2022)

#### 🚀 Enhancement

- Add publish and stamping support to VSCE rule [#13](https://github.com/player-ui/rules_player/pull/13) ([@adierkens](https://github.com/adierkens))

#### Authors: 1

- Adam Dierkens ([@adierkens](https://github.com/adierkens))

---

# v0.5.1 (Fri Jul 29 2022)

#### 🐛 Bug Fix

- flip ternary logic for templates [#12](https://github.com/player-ui/rules_player/pull/12) ([@hborawski](https://github.com/hborawski))

#### Authors: 1

- Harris Borawski ([@hborawski](https://github.com/hborawski))

---

# v0.5.0 (Thu Jul 21 2022)

### Release Notes

#### Better support for additional package.json attributes ([#11](https://github.com/player-ui/rules_player/pull/11))

Adds new rules to the `package.json` creation pipeline:

Adds `merge_json` rule to flatten multiple `json` files into one. This can be combined with the `base_package_json` attribute to create more dynamic package attributes. 

Adds a `create_contributors` rule for generating the `contributors` section of a `package.json` from an `.all-contributorsrc`


Example: 
```python
load("@rules_player//javascript/package_json:index.bzl", "merge_json", "create_contributors")

create_contributors(
    name = "pkg_json_contrib",
    all_contributors = "//:.all-contributorsrc",
)

merge_json(
    name = "pkg_json_template",
    srcs = [
        "package-template.json",
        ":pkg_json_contrib",
    ]
)
```

---

#### 🚀 Enhancement

- Better support for additional package.json attributes [#11](https://github.com/player-ui/rules_player/pull/11) ([@adierkens](https://github.com/adierkens))

#### Authors: 1

- Adam Dierkens ([@adierkens](https://github.com/adierkens))

---

# v0.4.1 (Wed Jul 20 2022)

#### ⚠️ Pushed to `main`

- propagate args for closing staging repo ([@sugarmanz](https://github.com/sugarmanz))

#### Authors: 1

- Jeremiah Zucker ([@sugarmanz](https://github.com/sugarmanz))

---

# v0.4.0 (Wed Jul 20 2022)

### Release Notes

#### Scope naming for kt_jvm intermediate targets ([#3](https://github.com/player-ui/rules_player/pull/3))

If the target name is the same as the local package name, the generated targets will omit the names. 

### Regular scope naming strategy:
```python

#### broader maven publishing support ([#9](https://github.com/player-ui/rules_player/pull/9))

- Maven Central compliant POM (`developers` tag)
- Coordinate `deploy_maven` targets under a single staging repository
- Allow for GPG passphrase

---

#### 🚀 Enhancement

- Scope naming for kt_jvm intermediate targets [#3](https://github.com/player-ui/rules_player/pull/3) ([@sugarmanz](https://github.com/sugarmanz))
- broader maven publishing support [#9](https://github.com/player-ui/rules_player/pull/9) ([@sugarmanz](https://github.com/sugarmanz))

#### Authors: 1

- Jeremiah Zucker ([@sugarmanz](https://github.com/sugarmanz))

---

# v0.3.0 (Wed Jul 20 2022)

#### 🚀 Enhancement

- Add stamp substitution support for nextjs docs [#10](https://github.com/player-ui/rules_player/pull/10) ([@adierkens](https://github.com/adierkens))

#### Authors: 1

- Adam Dierkens ([@adierkens](https://github.com/adierkens))

---

# v0.2.1 (Sun Jul 17 2022)

#### 🐛 Bug Fix

- Fix package name resolution for create_package_json [#8](https://github.com/player-ui/rules_player/pull/8) ([@adierkens](https://github.com/adierkens))

#### Authors: 1

- Adam Dierkens ([@adierkens](https://github.com/adierkens))

---

# v0.2.0 (Fri Jul 15 2022)

### Release Notes

#### Add better support for publishing npm packages ([#6](https://github.com/player-ui/rules_player/pull/6))

* Adds support for `registry` in the `js_pipeline`
* Adds `private` flag to omit publishing a package to `npm`
* Fixes version substitutions

---

#### 🚀 Enhancement

- Add better support for publishing npm packages [#6](https://github.com/player-ui/rules_player/pull/6) ([@adierkens](https://github.com/adierkens))

#### Authors: 1

- Adam Dierkens ([@adierkens](https://github.com/adierkens))

---

# v0.1.0 (Wed Jul 13 2022)

### Release Notes

#### Add rule for publishing to org-level github-pages repo ([#5](https://github.com/player-ui/rules_player/pull/5))

Adds a new rule for handling github-pages deployments specific to an organization. 
Releases are organized by major version number, with aliases for the latest release and canary versions.

---

#### 🚀 Enhancement

- Add rule for publishing to org-level github-pages repo [#5](https://github.com/player-ui/rules_player/pull/5) ([@adierkens](https://github.com/adierkens))

#### Authors: 1

- Adam Dierkens ([@adierkens](https://github.com/adierkens))

---

# v0.0.3 (Fri Jun 24 2022)

#### ⚠️ Pushed to `main`

- update kotlin rules sha checksum ([@sugarmanz](https://github.com/sugarmanz))

#### Authors: 1

- Jeremiah Zucker ([@sugarmanz](https://github.com/sugarmanz))

---

# v0.0.2 (Tue Jun 21 2022)

### Release Notes

#### Change rule name to just rules_player ([#1](https://github.com/player-ui/rules_player/pull/1))

Changes documentation and examples to use `@rules_player` as the workspace name

---

#### 🐛 Bug Fix

- Handle duplicate data refs in build + test rules [#2](https://github.com/player-ui/rules_player/pull/2) ([@adierkens](https://github.com/adierkens))
- Change rule name to just rules_player [#1](https://github.com/player-ui/rules_player/pull/1) ([@adierkens](https://github.com/adierkens))

#### Authors: 1

- Adam Dierkens ([@adierkens](https://github.com/adierkens))

---

# v0.0.1 (Thu Jun 09 2022)

#### ⚠️ Pushed to `main`

- Add auto name ([@adierkens](https://github.com/adierkens))
- Update deps ([@adierkens](https://github.com/adierkens))
- Fix circle config ([@adierkens](https://github.com/adierkens))
- fix executor ([@adierkens](https://github.com/adierkens))
- Add circle and auto ([@adierkens](https://github.com/adierkens))
- fix paths ([@adierkens](https://github.com/adierkens))
- Add player rules ([@adierkens](https://github.com/adierkens))

#### Authors: 1

- Adam Dierkens ([@adierkens](https://github.com/adierkens))
