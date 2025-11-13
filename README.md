<!-- SPDX-License-Identifier: MPL-2.0 -->
# module-estimator

A Course Production tool used to estimate the time required to build a module.

## Quick Start

### Requirements

- Docker

### Developing

```bash
docker compose up --watch

# open http://localhost:8080
```

## Deploying

**Develop in GitHub Codespaces to ensure all commands/packages are available.**

Confirm that the helm chart and the app deploy correctly:

```bash
make check

make cluster

skaffold dev
```

### Notes

- Branch features/fixes are reviewed using Codespaces

## Support

If you need any help with `module-estimator`, please [contact us](mailto:ltc_techops@bcit.ca).

Please submit any bugs, issues, and feature requests to the [bcit-ltc/module-estimator](https://github.com/bcit-ltc/module-estimator) source code repo.

## License

This Source Code Form is subject to the terms of the Mozilla Public License, v2.0. If a copy of the MPL was not distributed with this file, You can obtain one at <https://mozilla.org/MPL/2.0/>.

## About

Developed in 🇨🇦 Canada by the [Learning and Teaching Centre](https://www.bcit.ca/learning-teaching-centre/) at [BCIT](https://www.bcit.ca/).
