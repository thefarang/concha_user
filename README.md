# User Microservice for the Concha Distributed Application

## Package Locking
All packages are installed at a specific version, to ensure an exact, reproducible `node_modules` tree. This is achieved in two ways. Firstly, the `package.json` lists directly dependent packages at their exact version number. **No carets or tildes**. Secondly, the repo includes an `npm-shrinkwrap.json` file which additionally lists all **deeply-nested** dependent packages with their corresponding version numbers. When `npm install` is executed, the `npm-shrinkwrap.json` file will be referenced to ensure all packages are installed at the versions specified.

### Updating Existing Packages
First list the outdated packages:
```
$ npm outdated  
```

Next open `package.json`, locate the package to be updated, and add a caret to the package version number, to indicate that we want the latest version of the current major release. Then run:
```
$ npm update --save[-dev] <package_name>  
```

This will update the package and update both the `package.json` and `npm-shrinkwrap.json` files.

### Adding New Packages
```
$ npm install --save[-dev] <package>@<version>  
```

This will install the package and update both the `package.json` and `npm-shrinkwrap.json` files.
