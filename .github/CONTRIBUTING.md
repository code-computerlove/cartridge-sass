# Contributing

- [Discussing Issues](#discussing-issues)
- [Forking and branching](#forking-and-branching)
- [Commit messages](#commit-messages)

## Discussing Issues
If you have a bug fix, please [create an issue][new-issue-url] in the relevant project repository.

If you have a new expansion pack suggestion, please create an issue in the [base Cartridge project](https://github.com/cartridge/cartridge) so we can discuss it.

## Forking and branching
Fork the project then create a new feature branch to work on with a short feature description or the [GitHub issue number][issues-url] as a branch name eg:
```sh
git checkout -b feature/new-header
```

or

```sh
git checkout -b feature/39
```

Push to your fork
```sh
git push --set-upstream origin feature/MY-FEATURE
```

Then submit a [Pull Request][pr-url] for review and merging by a project owner.

## Commit messages
Try and adhere loosely to the [Angular commit messages guidelines](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#-git-commit-guidelines) style.

[Commitizen](https://github.com/commitizen/cz-cli) is a command line tool which can help with this:
```sh
npm install -g commitizen
```
Now, simply use `git cz` instead of `git commit` when committing.

---

[issues-url]: https://github.com/cartridge/cartridge-sass/issues
[new-issue-url]: https://github.com/cartridge/cartridge-sass/issues/new
[pr-url]: https://github.com/cartridge/cartridge-sass/compare
